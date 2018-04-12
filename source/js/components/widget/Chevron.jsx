import styled from 'styled-components';

const Chevron = styled.div`
  display: flex;
  &:before {
    border-style: solid;
    border-width: 3px 3px 0 0;
    content: '';
    display: inline-block;
    height: 8px;
    width: 8px;
    left: ${props => props.open ? '3px' : '0px' };
    top: ${ props => props.open ? '0px' : '3px' };
    margin-right: 10px;
    position: relative;
    transform: ${ props => props.open ? 'rotate(135deg)' : 'rotate(45deg)' };
    vertical-align: top;
  }
`;

export default Chevron;
