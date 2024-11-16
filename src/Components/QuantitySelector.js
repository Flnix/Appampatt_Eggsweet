
import React from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

export default function QuantitySelector(props) {
  const { quantity, onIncrease, onDecrease } = props;

  return (
    <ButtonGroup aria-label="Quantity selector">
      <Button variant="outline-secondary" onClick={onDecrease} disabled={quantity <= 0}>
        -
      </Button>
      <div className="px-2 d-flex align-items-center">{quantity}</div>
      <Button variant="outline-secondary" onClick={onIncrease} disabled={quantity >= 10}>
        +
      </Button>
    </ButtonGroup>
  );
}
