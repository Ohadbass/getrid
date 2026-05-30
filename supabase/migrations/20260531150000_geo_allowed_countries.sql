CREATE TABLE public.geo_allowed_countries (
  code char(2) PRIMARY KEY,
  name text NOT NULL,
  enabled boolean NOT NULL DEFAULT true,
  updated_at timestamptz NOT NULL DEFAULT now(),
  updated_by uuid REFERENCES auth.users(id)
);

CREATE INDEX geo_allowed_countries_enabled_idx ON public.geo_allowed_countries (enabled);

ALTER TABLE public.geo_allowed_countries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "service_role_full_access"
  ON public.geo_allowed_countries
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

INSERT INTO public.geo_allowed_countries (code, name, enabled)
VALUES ('IL', 'Israel', true);
