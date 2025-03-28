'use client';

import {  useEffect, useState } from "react";

  export default function Page() {
    const [isAppInstall, setIsAppInstall] = useState(null);
    
    useEffect(() => {
      const isDeepLink = window.location.href.includes('/app');
      let timeout;
      
      const handleVisibilityChange = () => {
        if (document.hidden) {
          clearTimeout(timeout); // 앱이 열렸다면 fallback 이동을 막음
        }
      };
      
      if (isDeepLink) {
        const env = (window.location.href).match(/app([^?]+)/)?.[1] ?? '';
        const appScheme = env === '' ? 'kurlyro' : 'kurlyro-stg';
        
        const deepLink = new URL(`${appScheme}://kurlyro-test.vercel.app/app${env}`);
        
        const searchParams = window.location.search;
        deepLink.search = searchParams.toString();

        // var now = new Date().valueOf();
        // setTimeout(function () {
        //     if (new Date().valueOf() - now > 100) return;
        //     window.location = window.location.origin;
        // }, 25);

        // /** app scheme 으로 Url 변경 */
        // try {
        //   window.location = deepLink.toString();
        // } catch (error) {
        //   console.log('이동실패', error);
          
        // }


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
            window.location = window.location.origin;
          }
        }, 1000);

        // 앱 실행 시도
        window.location = deepLink.toString();


        // window.addEventListener("visibilitychange", handleVisibilityChange);
      }

      // return () => {
      //   window.removeEventListener("visibilitychange", handleVisibilityChange);
      // }
    }, []);

    return <div></div>
  }