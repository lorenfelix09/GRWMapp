import { useEffect } from 'react';
import RootNavigator from './navigation/RootNavigator';
import { supabase, getCurrentUserId } from './lib/supabase';

export default function App() {
  useEffect(() => {
    console.log("DEU BOM");
    testarSupabase();
  }, []);

  async function testarSupabase() {
    try {
      // LOGIN TEMPORÁRIO
      const { data, error } = await supabase.auth.signInWithPassword({
        email: 'alexsander.oliveira08@aluno.ifce.edu.br',
        password: '123456',
      });

      if (error) {
        console.error('❌ Erro ao fazer login:', error.message);
        return;
      }

      console.log('✅ Login realizado!');
      console.log('👤 Usuário:', data.user.id);

      // Verifica se conseguimos recuperar o usuário logado
      const userId = await getCurrentUserId();

      console.log('🆔 ID do usuário:', userId);

    } catch (error) {
      console.error('❌ Erro inesperado:', error);
    }
  }

  return <RootNavigator />;
}