const score = async (
  problem: string,
  studentCode: string,
  sampleCode: string,
) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BE_API}/api/score/grade`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      problem,
      student_code: studentCode,
      sample_code: sampleCode,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || "Failed to grade code");
  }

  return data;
};

const generateProblem = async (
  topic: string,
  difficulty: string,
  language: string,
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BE_API}/api/problem-generator/generate`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        topic,
        difficulty,
        language,
      }),
    },
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.message || "Failed to generate problem");
  }

  return data;
};

export { score, generateProblem };
