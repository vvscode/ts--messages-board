// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import {getChannels} from '../../services/messages';
import { withApiErrorHandler } from '../../utils/server/withApiErrorHandler'

export default withApiErrorHandler(async function getChannelsHandler(
  req: NextApiRequest,
  res: NextApiResponse<readonly string[]>
) {
    const channels = await getChannels();
    res.status(200).json(channels);
});
