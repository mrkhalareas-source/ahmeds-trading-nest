CREATE TABLE public.payment_confirmations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL CHECK (char_length(full_name) BETWEEN 1 AND 100),
  contact text NOT NULL CHECK (char_length(contact) BETWEEN 3 AND 100),
  package text NOT NULL CHECK (char_length(package) BETWEEN 1 AND 100),
  amount text NOT NULL CHECK (char_length(amount) BETWEEN 1 AND 50),
  payment_method text NOT NULL CHECK (char_length(payment_method) BETWEEN 1 AND 60),
  transaction_id text NOT NULL CHECK (char_length(transaction_id) BETWEEN 3 AND 120),
  notes text CHECK (notes IS NULL OR char_length(notes) <= 500),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.payment_confirmations TO service_role;
ALTER TABLE public.payment_confirmations ENABLE ROW LEVEL SECURITY;