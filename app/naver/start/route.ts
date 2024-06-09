import { redirect } from 'next/navigation';

export function GET() {
  const baseURL = 'https://nid.naver.com/oauth2.0/authorize';
  const params = {
    client_id: process.env.NAVER_CLIENT_ID!,
    redirect_uri: 'http://localhost:3000/naver/complete',
    response_type: 'code',
    state: 'STATE_STRING',
  };
  //url parameter 만드는 방법
  const formattedParams = new URLSearchParams(params).toString();
  const finalUrl = `${baseURL}?${formattedParams}`;
  console.log(finalUrl);
  return redirect(finalUrl);
}
