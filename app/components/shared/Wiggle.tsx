import { useMemo } from 'react';

export function Wiggle() {
  const wiggleSvgDataUri =
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzkiIGhlaWdodD0iNyIgdmlld0JveD0iMCAwIDM5IDciIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxnIGNsaXAtcGF0aD0idXJsKCNjbGlwMF8xNDJfNSkiPgo8cGF0aCBkPSJNMCA2TDUgMUwxMCA2TDE1IDFMMTkuNSA2TDI0IDFMMjkgNkwzNCAxTDM5IDYiIHN0cm9rZT0iI0YzRjNGMyIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L2c+CjxkZWZzPgo8Y2xpcFBhdGggaWQ9ImNsaXAwXzE0Ml81Ij4KPHJlY3Qgd2lkdGg9IjM5IiBoZWlnaHQ9IjciIGZpbGw9IndoaXRlIi8+CjwvY2xpcFBhdGg+CjwvZGVmcz4KPC9zdmc+Cg==';
  const style = useMemo(
    () => ({
      width: '100%',
      height: '7px',
      background: `url(${wiggleSvgDataUri}) repeat-x 0 0`,
    }),
    [],
  );
  return <div style={style} />;
}
