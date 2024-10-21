import supabase from '../../config/supabaseClient';

// Save a message to Supabase
export const saveMessageToSupabase = async (messageData: { content: string, user: string }) => {
  const { data, error } = await supabase
    .from('messages')
    .insert([
      { content: messageData.content, user: messageData.user, created_at: new Date() }
    ]);

  if (error) {
    console.error('Error inserting message:', error);
    throw error;
  }

  return data;
};

// Fetch all messages from Supabase
export const getMessagesFromSupabase = async () => {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }

  return data;
};
