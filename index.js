export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST allowed" });
  }

  const { id, status, location, type } = req.body;

  if (!id || !status) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const scriptURL = "https://script.google.com/macros/s/AKfycbyuYHUolGBdLY3wuP-Qf4OJxRj3domlmP2Bo8nz7Kt0lgAecxJCwkQg1SPANIlAvPGY/exec";

  try {
    const response = await fetch(scriptURL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ id, status, location, type }).toString(),
    });

    const text = await response.text();
    return res.status(200).json({ message: "Success", response: text });
  } catch (error) {
    return res.status(500).json({ message: "Error sending to Apps Script", error: error.toString() });
  }
}
