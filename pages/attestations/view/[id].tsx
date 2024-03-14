import { Default } from 'components/layouts/Default';
import { AttestationViewer } from 'components/elements/AttestationViewer';

const AttestationsPage = () => {
  return (
    <Default pageName="Attestations">
      <AttestationViewer />
    </Default>
  );
};

export default AttestationsPage;