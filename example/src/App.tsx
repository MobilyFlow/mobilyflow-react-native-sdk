import AppMobilyFlow from './AppMobilyFlow';
import AppIapHub from './iaphub/AppIapHub';

export default function App() {
  const iaphub = true;
  return iaphub ? <AppIapHub /> : <AppMobilyFlow />;
}
