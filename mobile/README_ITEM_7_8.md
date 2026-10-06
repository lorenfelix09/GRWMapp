# GRWM — itens 7 e 8

## O que foi implementado

### Item 7 — API de roupas, categorias e looks
- CRUD de `clothing_items` em `services/clothingService.js`.
- Listagem de categorias em `services/categoryService.js`.
- CRUD de `looks` em `services/lookService.js`.
- Relação N:N entre looks e peças usando `look_items`.
- Verificação de que a peça/look pertence ao usuário autenticado.

### Item 8 — Upload e integração com banco
- Seleção de foto da galeria.
- Foto pela câmera.
- Upload da imagem para o bucket privado `clothing-images`.
- Caminho da imagem salvo em `clothing_items.image_url`.
- URL assinada gerada quando as peças são carregadas.
- Exclusão da peça também tenta remover a imagem do Storage.

## Configuração

1. Instale as dependências com:

```bash
npx expo install expo-image-picker expo-sqlite
npm install @supabase/supabase-js base64-arraybuffer react-native-url-polyfill
```

2. Copie `.env.example` para `.env` e preencha as variáveis do seu projeto Supabase.

3. Execute `supabase/001_grwm_storage.sql` no SQL Editor do Supabase.

4. O usuário precisa estar autenticado para usar as funções de roupas, looks e Storage.

## Estrutura principal

- `lib/supabase.js` — cliente Supabase e usuário atual.
- `services/clothingService.js` — roupas + upload.
- `services/categoryService.js` — categorias.
- `services/lookService.js` — looks + `look_items`.
- `screens/main/AddClothingScreen.js` — cadastro da peça com foto.
- `screens/main/WardrobeScreen.js` — closet conectado ao banco.
- `screens/main/LooksScreen.js` — looks conectados ao banco.
