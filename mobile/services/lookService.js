import { supabase, getCurrentUserId } from '../lib/supabase';

const LOOKS_TABLE = 'looks';
const ITEMS_TABLE = 'look_items';

export async function listarLooks() {
  const userId = await getCurrentUserId();

  const { data, error } = await supabase
    .from(LOOKS_TABLE)
    .select(`
      id,
      user_id,
      occasion,
      weather,
      style,
      preferred_color,
      explanation,
      created_at,
      look_items (
        clothing_item_id,
        clothing_items (*)
      )
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function buscarLook(id) {
  const userId = await getCurrentUserId();

  const { data, error } = await supabase
    .from(LOOKS_TABLE)
    .select(`
      id,
      user_id,
      occasion,
      weather,
      style,
      preferred_color,
      explanation,
      created_at,
      look_items (
        clothing_item_id,
        clothing_items (*)
      )
    `)
    .eq('id', id)
    .eq('user_id', userId)
    .single();

  if (error) throw error;
  return data;
}

export async function criarLook(look, clothingItemIds = []) {
  const userId = await getCurrentUserId();

  const { data: createdLook, error: lookError } = await supabase
    .from(LOOKS_TABLE)
    .insert({
      user_id: userId,
      occasion: look.occasion || null,
      weather: look.weather || null,
      style: look.style || null,
      preferred_color: look.preferred_color || null,
      explanation: look.explanation || null,
    })
    .select()
    .single();

  if (lookError) throw lookError;

  try {
    await substituirPecasDoLook(createdLook.id, clothingItemIds, userId);
    return await buscarLook(createdLook.id);
  } catch (error) {
    await supabase.from(LOOKS_TABLE).delete().eq('id', createdLook.id).eq('user_id', userId);
    throw error;
  }
}

export async function atualizarLook(id, alteracoes) {
  const userId = await getCurrentUserId();

  const { data, error } = await supabase
    .from(LOOKS_TABLE)
    .update({
      occasion: alteracoes.occasion || null,
      weather: alteracoes.weather || null,
      style: alteracoes.style || null,
      preferred_color: alteracoes.preferred_color || null,
      explanation: alteracoes.explanation || null,
    })
    .eq('id', id)
    .eq('user_id', userId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function atualizarLookComPecas(id, alteracoes, clothingItemIds = []) {
  const userId = await getCurrentUserId();
  const look = await atualizarLook(id, alteracoes);
  await substituirPecasDoLook(id, clothingItemIds, userId);
  return buscarLook(look.id);
}

export async function excluirLook(id) {
  const userId = await getCurrentUserId();

  const { error } = await supabase
    .from(LOOKS_TABLE)
    .delete()
    .eq('id', id)
    .eq('user_id', userId);

  if (error) throw error;
}

export async function adicionarPecaAoLook(lookId, clothingItemId) {
  const userId = await getCurrentUserId();
  await garantirDonoDoLook(lookId, userId);
  await garantirDonoDaPeca(clothingItemId, userId);

  const { error } = await supabase
    .from(ITEMS_TABLE)
    .insert({
      look_id: lookId,
      clothing_item_id: clothingItemId,
    });

  if (error && error.code !== '23505') throw error;
  return buscarLook(lookId);
}

export async function removerPecaDoLook(lookId, clothingItemId) {
  const userId = await getCurrentUserId();
  await garantirDonoDoLook(lookId, userId);

  const { error } = await supabase
    .from(ITEMS_TABLE)
    .delete()
    .eq('look_id', lookId)
    .eq('clothing_item_id', clothingItemId);

  if (error) throw error;
  return buscarLook(lookId);
}

async function substituirPecasDoLook(lookId, clothingItemIds, userId) {
  const ids = [...new Set(clothingItemIds)].filter(Boolean);

  const { error: deleteError } = await supabase
    .from(ITEMS_TABLE)
    .delete()
    .eq('look_id', lookId);

  if (deleteError) throw deleteError;

  if (ids.length === 0) return;

  const { data: ownedItems, error: itemsError } = await supabase
    .from('clothing_items')
    .select('id')
    .eq('user_id', userId)
    .in('id', ids);

  if (itemsError) throw itemsError;

  const ownedIds = new Set((ownedItems || []).map((item) => item.id));
  const invalidIds = ids.filter((id) => !ownedIds.has(id));

  if (invalidIds.length) {
    throw new Error('Uma ou mais peças não pertencem ao usuário atual.');
  }

  const rows = ids.map((clothingItemId) => ({
    look_id: lookId,
    clothing_item_id: clothingItemId,
  }));

  const { error: insertError } = await supabase.from(ITEMS_TABLE).insert(rows);
  if (insertError) throw insertError;
}

async function garantirDonoDoLook(lookId, userId) {
  const { data, error } = await supabase
    .from(LOOKS_TABLE)
    .select('id')
    .eq('id', lookId)
    .eq('user_id', userId)
    .single();

  if (error || !data) {
    throw new Error('Look não encontrado ou não pertence ao usuário atual.');
  }
}

async function garantirDonoDaPeca(clothingItemId, userId) {
  const { data, error } = await supabase
    .from('clothing_items')
    .select('id')
    .eq('id', clothingItemId)
    .eq('user_id', userId)
    .single();

  if (error || !data) {
    throw new Error('Peça não encontrada ou não pertence ao usuário atual.');
  }
}
