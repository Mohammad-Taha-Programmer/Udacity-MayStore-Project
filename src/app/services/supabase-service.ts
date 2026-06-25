import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SupabaseService {
  private supabaseUrl = 'https://uifqlzrxgikrguxqwiyi.supabase.co';
  private supabaseKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpZnFsenJ4Z2lrcmd1eHF3aXlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIyOTg1NTMsImV4cCI6MjA5Nzg3NDU1M30.AlezSXoRxuUUqPxuv3kn536SfIqGG58UIjBp-9SNf5w';

  async query<T>(
    table: string,
    options: {
      select?: string;
      filter?: string;
      order?: string;
      limit?: number;
    } = {},
  ): Promise<T[]> {
    let url = `${this.supabaseUrl}/rest/v1/${table}?select=${options.select || '*'}`;
    if (options.filter) url += `&${options.filter}`;
    if (options.order) url += `&order=${options.order}`;
    if (options.limit) url += `&limit=${options.limit}`;

    const response = await fetch(url, {
      headers: {
        apikey: this.supabaseKey,
        Authorization: `Bearer ${this.supabaseKey}`,
      },
    });
    if (!response.ok) throw new Error(`Query failed: ${response.statusText}`);
    return response.json();
  }

  async insert<T>(table: string, data: Partial<T>): Promise<T> {
    const response = await fetch(`${this.supabaseUrl}/rest/v1/${table}`, {
      method: 'POST',
      headers: {
        apikey: this.supabaseKey,
        Authorization: `Bearer ${this.supabaseKey}`,
        'Content-Type': 'application/json',
        Prefer: 'return=representation',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(`Insert failed: ${response.statusText}`);
    return (await response.json())[0];
  }

  async update<T>(table: string, id: number, data: Partial<T>): Promise<T> {
    const response = await fetch(`${this.supabaseUrl}/rest/v1/${table}?id=eq.${id}`, {
      method: 'PATCH',
      headers: {
        apikey: this.supabaseKey,
        Authorization: `Bearer ${this.supabaseKey}`,
        'Content-Type': 'application/json',
        Prefer: 'return=representation',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(`Update failed: ${response.statusText}`);
    return (await response.json())[0];
  }

  async delete(table: string, id: number): Promise<void> {
    const response = await fetch(`${this.supabaseUrl}/rest/v1/${table}?id=eq.${id}`, {
      method: 'DELETE',
      headers: {
        apikey: this.supabaseKey,
        Authorization: `Bearer ${this.supabaseKey}`,
      },
    });
    if (!response.ok) throw new Error(`Delete failed: ${response.statusText}`);
  }
}
