import { registerAs } from '@nestjs/config';
import { IsString } from 'class-validator';
import validateConfig from '../../utils/validate-config';
import { MarketNewsconfig } from './market-news-config.type';

class EnvironmentVariablesValidator {
  @IsString()
  MARKETAUX_API_KEY: string;

  @IsString()
  MARKETAUX_API_URL: string;
}

export default registerAs<MarketNewsconfig>('thirdParty.market', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  const apiKey = process.env.MARKETAUX_API_KEY;
  const apiUri = process.env.MARKETAUX_API_URL;

  if (!apiKey || !apiUri) {
    throw new Error('MARKETAUX_API_KEY and MARKETAUX_API_URL must be defined');
  }

  return {
    apiKey,
    apiUri,
  };
});
