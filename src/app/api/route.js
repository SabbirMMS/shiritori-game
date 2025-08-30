import axios from "axios";

export async function POST(req) {
  try {


    const { word } = await req.json();

    const result = await axios.get(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );

    if (result?.data && Array.isArray(result.data)) {
      console.log(true);
      return new Response(JSON.stringify({ valid: true }), { status: 200 });
    }
    return new Response(JSON.stringify({ valid: false }), { status: 200 });


  } catch (err) {
    console.log(err);
  }
  
}
