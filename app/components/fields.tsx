import {
  LinkLightSmall,
  TextLight,
  TextLightSmall,
  TextMedium,
  TextMediumGreen,
} from './typography';

/** Header-value React component field for Event card */
export function EventField(props: { header: string; value: string; link?: string }) {
  return (
    <div className='w-fit'>
      <TextMedium>{props.header}</TextMedium>
      {props.link ? (
        <LinkLightSmall href={props.link}>{props.value}</LinkLightSmall>
      ) : (
        <TextLightSmall>{props.value}</TextLightSmall>
      )}
    </div>
  );
}

/** Header-value React component field for Address Bubble */
export function AddressField(props: { header: string; value: string }) {
  return (
    <div className='w-fit'>
      <TextMedium>{props.header}</TextMedium>
      <TextLight>{props.value}</TextLight>
    </div>
  );
}

/** Header-value React component field for Status field in Event card */
export function StatusField(props: { header: string; value: string }) {
  return (
    <div className='w-fit'>
      <TextMediumGreen>{props.header}</TextMediumGreen>
      <TextLightSmall>{props.value}</TextLightSmall>
    </div>
  );
}
