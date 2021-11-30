// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import {addChannelMessage} from '../../services/messages';
import { withApiErrorHandler } from '../../utils/withApiErrorHandler';

export default withApiErrorHandler(async function addChannelMessageHanlder(
  req: NextApiRequest,
  res: NextApiResponse<readonly string[]>
) {
  if (req.method !== 'POST') {
   throw new Error('Only POST method is allowed'); 
  };
  if (typeof req.body.message !== 'string') {
    throw new Error('Message text is required');
  }
  if (typeof req.query.channel !== 'string') {
    throw new Error('Channel name is required');
  }

  const messages = await addChannelMessage(req.query.channel, req.body.message);
  res.status(200).json(messages);
});
