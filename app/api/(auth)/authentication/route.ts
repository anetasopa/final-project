import * as Ably from 'ably/promises';
import * as dotenv from 'dotenv';
import { NextResponse } from 'next/server';
import util from 'util';

dotenv.config();

export type Error = {
  error: string;
};

type UsersResponseBodyGet = Ably.Types.TokenRequest | Error;

export async function GET(): Promise<NextResponse<UsersResponseBodyGet>> {
  // console.log('/api/authentication called');
  // console.log('auth key? :', process.env.ABLY_API_KEY);

  // if (!process.env.ABLY_API_KEY) {
  //   return NextResponse.json(
  //     {
  //       error: `Missing ABLY_API_KEY environment variable.
  //       If you're running locally, please ensure you have a ./.env file with a value for ABLY_API_KEY=your-key.
  //       If you're running in Netlify, make sure you've configured env variable ABLY_API_KEY.
  //       Please see README.md for more details on configuring your Ably API Key.`,
  //     },
  //     { status: 500 },
  //   );
  // }

  // const clientId = process.env.DEFAULT_CLIENT_ID || 'NO_CLIENT_ID';
  // const client = new Ably.Rest(process.env.ABLY_API_KEY);
  // const tokenRequestData = await client.auth.createTokenRequest({
  //   clientId: clientId,
  // });

  // const realtime = new Ably.Realtime(process.env.ABLY_API_KEY);
  // realtime.channels
  //   .get('4-5', {
  //     params: { rewind: '3' },
  //   })
  //   .subscribe((msg) => console.log('Received message: ', msg));

  //   const realtime = new Ably.Realtime('60h5pg.yM_9iQ:*****');
  // realtime.channels.get('arc-map-van', {
  //   params: {rewind: '3'}
  // }).subscribe(msg => console.log("Received message: ", msg));

  // const realtime = new Ably.Realtime(
  //   '60h5pg.wh7ohQ:Ha3EOQ-pkWf2rY6SKPjbcdrUGo0PcaEZ-qJW2JxbxsU',
  // );
  // const channel = realtime.channels.get('1-2');
  // const message = {
  //   creatorUserId: 3,
  //   receiverUserId: 4,
  //   content: 'My content',
  // };

  // const message2 = {
  //   creatorUserId: 1,
  //   receiverUserId: 2,
  //   content: 'My content between 1-2',
  // };

  // channel.publish('example', JSON.stringify(message2), (err) => {
  //   channel.history((err, resultPage) => {
  //     console.log(
  //       util.inspect(
  //         {
  //           items: resultPage.items,
  //         },
  //         { showHidden: false, depth: null, colors: true },
  //       ),
  //     );
  //   });
  // });

  return NextResponse.json({});
}
