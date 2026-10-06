-- Bucket privado para as fotos das roupas.
-- Crie este bucket no Storage com o nome: clothing-images
-- Depois aplique as políticas abaixo.

insert into storage.buckets (id, name, public)
values ('clothing-images', 'clothing-images', false)
on conflict (id) do nothing;

create policy "Usuários podem enviar suas próprias fotos"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'clothing-images'
  and (storage.foldername(name))[1] = (select auth.uid()::text)
);

create policy "Usuários podem visualizar suas próprias fotos"
on storage.objects
for select
to authenticated
using (
  bucket_id = 'clothing-images'
  and (storage.foldername(name))[1] = (select auth.uid()::text)
);

create policy "Usuários podem atualizar suas próprias fotos"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'clothing-images'
  and (storage.foldername(name))[1] = (select auth.uid()::text)
)
with check (
  bucket_id = 'clothing-images'
  and (storage.foldername(name))[1] = (select auth.uid()::text)
);

create policy "Usuários podem excluir suas próprias fotos"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'clothing-images'
  and (storage.foldername(name))[1] = (select auth.uid()::text)
);
