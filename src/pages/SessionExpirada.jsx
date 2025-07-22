import {
	ButtonPrimary,
} from 'componentesUI';
export const SessionExpirada = () => {
  return (
    <div className='flex flex-col gap-[16px] items-center justify-center'>
      <h2 className="texto_18_600 text-center">Sesión expirada</h2>
      <p className="texto_18_600 text-center">
        Por motivos de seguridad, tu sesión ha expirado debido a inactividad. Por favor, iniciá sesión nuevamente para continuar.
      </p>
      <ButtonPrimary texto='IR A LOGIN' click={() => window.location.href = '/comunicaciones/'} />
    </div>
  );
}