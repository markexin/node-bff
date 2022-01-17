import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { router } from './router';

const App = () => {
  return (
    <Routes>
      {router.map((r) => (
        <Route
          key={r.itemKey}
          path={r.itemKey}
          element={
            <Suspense fallback={<>...</>}>
              {React.createElement(r.components)}
            </Suspense>
          }
        />
      ))}
      <Route
        path='*'
        element={
          <main style={{ padding: '1rem' }}>
            <p>Something went wrong!</p>
          </main>
        }
      />
    </Routes>
  );
};

export default App;
