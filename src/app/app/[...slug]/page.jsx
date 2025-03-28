'use client';

import {  useEffect } from "react";

  export default function Page() {
    useEffect(() => {
      const isDeepLink = window.location.href.includes('/app');
      
      if (isDeepLink) {
        const env = (window.location.href).match(/\/app([^?]+)/)?.[1] ?? '';
        console.log('env', env);
        const appScheme = env === '' ? 'kurlyro' : 'kurlyro-stg';
        
        const deepLink = new URL(`${appScheme}://kurlyro-test.vercel.app${env}`);
        
        const searchParams = window.location.search;
        deepLink.search = searchParams.toString();

        const now = Date.now();
        let hasFocusChanged = false;

        // 앱이 실행될 경우, 브라우저 포커스가 변경됨
        const onVisibilityChange = () => {
          if (document.hidden) {
            hasFocusChanged = true; // 사용자가 앱으로 이동했다고 판단
          }
        };

        document.addEventListener("visibilitychange", onVisibilityChange);

        // 일정 시간이 지난 후에도 앱이 실행되지 않았다면 fallback URL로 이동
        setTimeout(() => {
          document.removeEventListener("visibilitychange", onVisibilityChange);

          if (!hasFocusChanged && Date.now() - now < 1500) {
            window.location = (window.location.origin + '/app' + env);
          }
        }, 1000);

        try {
          window.location = (deepLink.toString());
          
        } catch (error) {
          window.location = (window.location.origin + env);
        }
      }
    }, []);

    return <div></div>
  }