import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@grwm_clothing_items';

async function getItems() {
  const stored = await AsyncStorage.getItem(STORAGE_KEY);

  if (!stored) {
    return [];
  }

  try {
    return JSON.parse(stored);
  } catch (error) {
    console.warn('Não foi possível ler as peças salvas:', error);
    return [];
  }
}

async function saveItems(items) {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export async function listarPecas() {
  return getItems();
}

export async function buscarPeca(id) {
  const items = await getItems();

  const item = items.find((peca) => peca.id === id);

  if (!item) {
    throw new Error('Peça não encontrada.');
  }

  return item;
}

export async function criarPeca(peca) {
  const items = await getItems();

  const novaPeca = {
    id: Date.now().toString(),
    name: peca.name,
    category: peca.category,
    color: peca.color || null,
    style: peca.style || null,
    temperature: peca.temperature || null,
    image_url: peca.image_url || null,
    occasion: peca.occasion || [],
    favorite: peca.favorite || false,
    created_at: new Date().toISOString(),
  };

  const updatedItems = [novaPeca, ...items];

  await saveItems(updatedItems);

  return novaPeca;
}

export async function atualizarPeca(id, alteracoes) {
  const items = await getItems();

  const updatedItems = items.map((item) => {
    if (item.id !== id) {
      return item;
    }

    return {
      ...item,
      name: alteracoes.name ?? item.name,
      category: alteracoes.category ?? item.category,
      color: alteracoes.color ?? item.color,
      style: alteracoes.style ?? item.style,
      temperature: alteracoes.temperature ?? item.temperature,
      image_url: alteracoes.image_url ?? item.image_url,
      occasion: alteracoes.occasion ?? item.occasion,
      favorite: alteracoes.favorite ?? item.favorite,
    };
  });

  await saveItems(updatedItems);

  const updatedItem = updatedItems.find((item) => item.id === id);

  if (!updatedItem) {
    throw new Error('Peça não encontrada.');
  }

  return updatedItem;
}

export async function excluirPeca(id) {
  const items = await getItems();

  const updatedItems = items.filter((item) => item.id !== id);

  await saveItems(updatedItems);
}

export async function uploadImagemPeca(localUri) {
  // No armazenamento local, usamos diretamente a URI
  // da imagem escolhida pelo usuário.
  return localUri;
}

export async function criarPecaComImagem(
  peca,
  localImageUri
) {
  return criarPeca({
    ...peca,
    image_url: localImageUri || null,
  });
}
