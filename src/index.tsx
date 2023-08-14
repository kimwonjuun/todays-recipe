import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

// ReactDOM.render(
//   <RecoilRoot>
//     <QueryClientProvider client={queryClient}>
//       <App />
//     </QueryClientProvider>
//   </RecoilRoot>,
//   document.getElementById('root') as HTMLElement
// );

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <RecoilRoot>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </RecoilRoot>
);
