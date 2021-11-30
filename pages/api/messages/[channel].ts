// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import {getChannelMessages} from '../../../services/messages';
import { withApiErrorHandler } from '../../../utils/server/withApiErrorHandler';

export default withApiErrorHandler(async function getChannelMessagesHandler(
  req: NextApiRequest,
  res: NextApiResponse<readonly string[]>
) {
  if (req.method !== 'GET') {
   throw new Error('Only GET method is allowed'); 
  };
  if (typeof req.query.channel !== 'string') {
    throw new Error('Channel name is required');
  }

  const messages = await getChannelMessages(req.query.channel as string);
  res.status(200).json(messages);
});
