-- Create library table for books and documents
CREATE TABLE public.library (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  file_url TEXT NOT NULL,
  file_type TEXT DEFAULT 'pdf',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.library ENABLE ROW LEVEL SECURITY;

-- RLS policies for library
CREATE POLICY "Anyone can view library items"
ON public.library
FOR SELECT
USING (true);

CREATE POLICY "Admins can manage library"
ON public.library
FOR ALL
USING (has_role(auth.uid(), 'admin'));

-- Create trigger for updated_at
CREATE TRIGGER update_library_updated_at
BEFORE UPDATE ON public.library
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for materials (PDFs for lessons)
INSERT INTO storage.buckets (id, name, public) VALUES ('materials', 'materials', true);

-- Create storage bucket for library (books/documents)
INSERT INTO storage.buckets (id, name, public) VALUES ('library', 'library', true);

-- Storage policies for materials bucket
CREATE POLICY "Anyone can view materials"
ON storage.objects FOR SELECT
USING (bucket_id = 'materials');

CREATE POLICY "Admins can upload materials"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'materials' AND has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update materials"
ON storage.objects FOR UPDATE
USING (bucket_id = 'materials' AND has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete materials"
ON storage.objects FOR DELETE
USING (bucket_id = 'materials' AND has_role(auth.uid(), 'admin'));

-- Storage policies for library bucket
CREATE POLICY "Anyone can view library files"
ON storage.objects FOR SELECT
USING (bucket_id = 'library');

CREATE POLICY "Admins can upload library files"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'library' AND has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update library files"
ON storage.objects FOR UPDATE
USING (bucket_id = 'library' AND has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete library files"
ON storage.objects FOR DELETE
USING (bucket_id = 'library' AND has_role(auth.uid(), 'admin'));