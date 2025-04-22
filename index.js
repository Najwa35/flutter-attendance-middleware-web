export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST allowed' });
  }

  const { id, status, location, type } = req.body;

  const query = new URLSearchParams({ id, status, location, type });
  const appsScriptURL = "https://script.google.com/macros/s/AKfycbyuYHUolGBdLY3wuP-Qf4OJxRj3domlmP2Bo8nz7Kt0lgAecxJCwkQg1SPAIlAvPGY/exec";

  try {
    const response = await fetch(appsScriptURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: query
    });

    const text = await response.text();
    res.status(200).send(text);
  } catch (error) {
    res.status(500).json({ message: 'Middleware Error', error: error.toString() });
  }
}
