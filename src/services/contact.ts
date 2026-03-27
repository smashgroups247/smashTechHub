export interface ContactPayload {
  fullName: string;
  email: string;
  serviceOfInterest: string;
  projectDetails: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
}

export async function submitContactForm(payload: ContactPayload): Promise<ContactResponse> {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  
  const response = await fetch(`${API_URL}/api/v1/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  let data;
  try {
    data = await response.json();
  } catch (err) {
    // If the response isn't JSON (e.g., a Next.js 404 HTML page), we catch it here
    data = null;
  }

  if (!response.ok) {
    throw {
      status: response.status,
      message: data?.message || `Server Error: ${response.status} ${response.statusText}`,
    };
  }

  return data;
}
