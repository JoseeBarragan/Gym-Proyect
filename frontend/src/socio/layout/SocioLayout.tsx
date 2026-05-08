import { Outlet } from 'react-router-dom';
import { Header } from '../../home/components/Header';

export function SocioLayout() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Header variant="socio" />
      <div className="pt-20">
        <div className="p-4 lg:p-8 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
