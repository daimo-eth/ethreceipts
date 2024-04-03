import { TextLight, TextLightSmall, TextMedium, TextMediumGreen } from './typography';

export function EventField(props: { header: string; value: string }) {
  return (
    <div className='w-fit'>
      <TextMedium>{props.header}</TextMedium>
      <TextLightSmall>{props.value}</TextLightSmall>
    </div>
  );
}

export function AddressField(props: { header: string; value: string }) {
  return (
    <div className='w-fit'>
      <TextMedium>{props.header}</TextMedium>
      <TextLight>{props.value}</TextLight>
    </div>
  );
}

export function StatusField(props: { header: string; value: string }) {
  return (
    <div className='w-fit'>
      <TextMediumGreen>{props.header}</TextMediumGreen>
      <TextLightSmall>{props.value}</TextLightSmall>
    </div>
  );
}
