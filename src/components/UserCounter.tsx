import React, { useState, useEffect } from 'react';
import { Users } from 'lucide-react';
import { supabase } from '../services/supabase';

export default function UserCounter() {
  const [userCount, setUserCount] = useState(10462);

  useEffect(() => {
    // Get initial count
    supabase
      .from('global_counter')
      .select('count')
      .single()
      .then(({ data, error }) => {
        if (!error && data) {
          setUserCount(data.count);
        }
      });

    // Subscribe to real-time changes
    const subscription = supabase
      .channel('global_counter')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'global_counter',
        },
        (payload) => {
          setUserCount(payload.new.count);
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center bg-gray-800/50 p-4 rounded-2xl border border-purple-900/20">
      <div className="flex items-center space-x-3 mb-2">
        <Users className="h-6 w-6 text-purple-400" />
        <span className="text-2xl font-bold text-white">
          {userCount.toLocaleString()}
        </span>
      </div>
      <p className="text-gray-400">Active Users</p>
    </div>
  );
}