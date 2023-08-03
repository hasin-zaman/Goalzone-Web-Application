import styled from 'styled-components';

const Heading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.color || '#ffffff'};
  font-size: ${(props) => props.fontSize || '24px'};
  font-weight: ${(props) => props.fontWeight || '700'};
  padding: 10px;
  position: relative;
  margin: ${(props) => props.margin || '30px 0'};

  &::before,
  &::after {
    content: '';
    height: ${(props) => props.height || '2px'};
    width: ${(props) => props.width || '200px'};
    background-color: ${(props) => props.dividerColor || 'rgba(255, 255, 255, 0.2)'};
  }

  &::before {
    margin-right: 10px;
  }

  &::after {
    margin-left: 10px;
  }
`;

export default function HeadingWithDividers({
  title,
  color,
  fontSize,
  fontWeight,
  height,
  width,
  dividerColor,
  margin
}) {
  return (
    <>
      <Heading
        color={color}
        fontSize={fontSize}
        fontWeight={fontWeight}
        height={height}
        width={width}
        dividerColor={dividerColor}
        margin={margin}
      >
        {title}
      </Heading>
    </>
  );
}
