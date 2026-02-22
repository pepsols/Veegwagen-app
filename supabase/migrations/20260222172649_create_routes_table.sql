/*
  # Create Routes Table

  1. New Tables
    - `routes`
      - `id` (uuid, primary key)
      - `name` (text, route name)
      - `coordinates` (jsonb, array of [lat, lng] pairs)
      - `distance` (numeric, total distance in meters)
      - `duration` (integer, tracking duration in seconds)
      - `created_at` (timestamp)
      - `user_id` (uuid, for future auth support)

  2. Security
    - Enable RLS on `routes` table
    - Public read access for routes
*/

CREATE TABLE IF NOT EXISTS routes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  coordinates jsonb NOT NULL DEFAULT '[]',
  distance numeric DEFAULT 0,
  duration integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  user_id uuid
);

ALTER TABLE routes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Routes are publicly readable"
  ON routes
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can insert routes"
  ON routes
  FOR INSERT
  TO public
  WITH CHECK (true);
