import { Auth } from 'aws-amplify';
import { CognitoUserSession } from 'amazon-cognito-identity-js';
import { useEffect, useState } from 'react';

// [Auth 拡張実装] ログインユーザを管理するHooks
const useLoginUser = () => {
  const [session, setSession] = useState<CognitoUserSession | undefined>();
  const [email, setEmail] = useState<string | undefined>();

  useEffect(() => {
    Auth.currentSession().then((s) => {
      setSession(s);
    });
  }, []);

  useEffect(() => {
    Auth.currentAuthenticatedUser().then((user) => {
      setEmail(user.attributes.email);
    });
  }, []);

  return {
    token: session?.getIdToken().getJwtToken() ?? null,
    userGroup: session?.getAccessToken().payload['cognito:groups'] ?? null,
    email: email,
  };
};

export default useLoginUser;