const askPambot = async (question: string) => {
  console.log("API URL:", process.env.NEXT_PUBLIC_BE_API);
  const res = await fetch(`${process.env.NEXT_PUBLIC_BE_API}/api/pambot/ask`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      question: question,
    }),
  });

  console.log("Pambot API response status:", res.status);
  const data = await res.json();
  console.log("Pambot API response data:", data);
  return data;
};

export { askPambot };
