import { decode } from 'base64-arraybuffer';
import * as FileSystem from 'expo-file-system/legacy';
import 'react-native-get-random-values';

import { supabase, getCurrentUserId } from '../lib/supabase';

const TABLE = 'clothing_items';
const BUCKET = 'clothing-images';

export async function listarPecas() {
  const userId = await getCurrentUserId();

  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;

  return attachImageUrls(data || []);
}

export async function buscarPeca(id) {
  const userId = await getCurrentUserId();

  const { data, error } = await supabase
    .from(TABLE)
    .select('*')
    .eq('id', id)
    .eq('user_id', userId)
    .single();

  if (error) throw error;

  const [item] = await attachImageUrls([data]);
  return item;
}

export async function criarPeca(peca) {
  const userId = await getCurrentUserId();

  const { data, error } = await supabase
    .from(TABLE)
    .insert({
      user_id: userId,
      name: peca.name,
      category: peca.category,
      color: peca.color || null,
      style: peca.style || null,
      temperature: peca.temperature || null,
      image_url: peca.image_url || null,
      occasion: peca.occasion || [],
      favorite: peca.favorite || false,
    })
    .select()
    .single();

  if (error) throw error;

  const [item] = await attachImageUrls([data]);
  return item;
}

export async function atualizarPeca(id, alteracoes) {
  const userId = await getCurrentUserId();

  const { data, error } = await supabase
    .from(TABLE)
    .update({
      name: alteracoes.name,
      category: alteracoes.category,
      color: alteracoes.color || null,
      style: alteracoes.style || null,
      temperature: alteracoes.temperature || null,
      image_url: alteracoes.image_url || null,
      occasion: alteracoes.occasion || [],
      favorite: alteracoes.favorite ?? false,
    })
    .eq('id', id)
    .eq('user_id', userId)
    .select()
    .single();

  if (error) throw error;

  const [item] = await attachImageUrls([data]);
  return item;
}

export async function excluirPeca(id) {
  const userId = await getCurrentUserId();
  const item = await buscarPeca(id);

  const { error } = await supabase
    .from(TABLE)
    .delete()
    .eq('id', id)
    .eq('user_id', userId);

  if (error) throw error;

  if (item.image_url) {
    const { error: storageError } = await supabase.storage
      .from(BUCKET)
      .remove([item.image_url]);

    if (storageError) {
      console.warn('A peça foi excluída, mas a imagem não pôde ser removida:', storageError);
    }
  }
}

export async function uploadImagemPeca(localUri, mimeType = 'image/jpeg') {
  const userId = await getCurrentUserId();

  const base64 = await FileSystem.readAsStringAsync(localUri, {
    encoding: FileSystem.EncodingType.Base64,
  });

  const extension = getExtension(localUri, mimeType);
  const path = `${userId}/${Date.now()}.${extension}`;

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(path, decode(base64), {
      contentType: mimeType,
      upsert: false,
    });

  if (error) throw error;

  return path;
}

export async function criarPecaComImagem(peca, localImageUri, mimeType = 'image/jpeg') {
  const imagePath = localImageUri
    ? await uploadImagemPeca(localImageUri, mimeType)
    : null;

  try {
    return await criarPeca({
      ...peca,
      image_url: imagePath,
    });
  } catch (error) {
    if (imagePath) {
      await supabase.storage.from(BUCKET).remove([imagePath]);
    }
    throw error;
  }
}

async function attachImageUrls(items) {
  return Promise.all(
    items.map(async (item) => {
      if (!item.image_url) return item;

      const { data, error } = await supabase.storage
        .from(BUCKET)
        .createSignedUrl(item.image_url, 60 * 60);

      if (error) {
        console.warn('Não foi possível gerar a URL da imagem:', error);
        return item;
      }

      return {
        ...item,
        image_url: data?.signedUrl || null,
        image_path: item.image_url,
      };
    })
  );
}

function getExtension(uri, mimeType) {
  const fromMime = mimeType?.split('/')[1];
  if (fromMime && ['jpeg', 'jpg', 'png', 'webp'].includes(fromMime)) {
    return fromMime === 'jpeg' ? 'jpg' : fromMime;
  }

  const cleanUri = uri.split('?')[0];
  const extension = cleanUri.split('.').pop()?.toLowerCase();
  return ['jpg', 'jpeg', 'png', 'webp'].includes(extension) ? extension : 'jpg';
}
