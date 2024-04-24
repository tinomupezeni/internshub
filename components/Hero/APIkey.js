import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";

class APIkey {
  static async fetchSecret() {
    const secret_name = "ai-key";
    const client = new SecretsManagerClient({ region: "eu-north-1" });

    let response;
    try {
      response = await client.send(
        new GetSecretValueCommand({
          SecretId: secret_name,
          VersionStage: "AWSCURRENT",
        })
      );
    } catch (error) {
      throw error;
    }

    const secret = response.SecretString;
    return secret;
  }
}

export default APIkey