import { AvatarConfig, ImageType } from '@/types';
import { useState, useEffect } from 'react';
import Modal from '../Common';
import Code from '../../Code';

type EmbedModalProps = {
  onCancel: () => void;
  config: AvatarConfig;
  imageType: ImageType;
};

export default function EmbedModal({ onCancel, config }: EmbedModalProps) {
  const [url, setUrl] = useState(``);

  useEffect(() => {
    setUrl(
      `${process.env.NEXT_PUBLIC_URL}/api/svg/${btoa(JSON.stringify(config))}`,
    );
  }, [config]);

  return (
    <Modal onCancel={onCancel}>
      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div className="my-2">
          <h2 className="text-xl uppercase">URL</h2>
          <Code code={url} />
        </div>
        <div className="my-2">
          <h2 className="text-xl">{`<img>`}</h2>
          <Code code={`<img src="${url}" alt="notion avatar">`} />
        </div>
        <div className="my-2">
          <h2 className="text-xl">Markdown</h2>
          <Code code={`![notion avatar](${url})`} />
        </div>
      </div>
    </Modal>
  );
}
