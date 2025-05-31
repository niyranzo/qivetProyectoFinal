export const uploadImage = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No se recibió ninguna imagen' });
  }
  res.json({ imageUrl: `images/${req.file.filename}` });
};

export const uploadPdf = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No se recibió ningún archivo PDF' });
  }
  res.json({ pdfUrl: `pdfs/${req.file.filename}` });
};
