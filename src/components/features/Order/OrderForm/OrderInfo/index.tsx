import { Divider } from '@chakra-ui/react';
import styled from '@emotion/styled';

import { useGetProductDetail } from '@/api/hooks/products/useGetProductDetail';
import { Button } from '@/components/common/Button';
import { Spacing } from '@/components/common/layouts/Spacing';
import type { OrderHistory } from '@/types';

import { HeadingText } from '../Common/HeadingText';
import { LabelText } from '../Common/LabelText';
import { CashReceiptFields } from '../Fields/CashReceiptFields';

type Props = {
  orderHistory: OrderHistory;
};
export const OrderFormOrderInfo = ({ orderHistory }: Props) => {
  const { productId, count } = orderHistory;

  const { data: detail } = useGetProductDetail({ productId: productId.toString() });
  const totalPrice = detail.price * count;
  const discount = 100; // 포인트로 바꾸기
  const sellingPrice = totalPrice - discount;

  return (
    <Wrapper>
      <Title>
        <HeadingText>결제 정보</HeadingText>
      </Title>
      <Divider color="#ededed" />
      <>
        <CashReceiptFields />
      </>
      <Divider color="#ededed" />
      <>
        <Subtitle>
          <LabelText>결제정보</LabelText>
        </Subtitle>
        <Divider color="#ededed" />
        <ListWrapper>
          <li className="list_item">
            <span className="tit_price">총 상품금액 ({count}개)</span>
            <span className="num_price">{totalPrice}원</span>
          </li>
          <li className="list_item">
            <span className="tit_price">쇼핑포인트 사용</span>
            <span className="num_price">- {discount}원</span>
          </li>
        </ListWrapper>
        <ItemWrapper>
          <LabelText>최종 결제금액</LabelText>
          <HeadingText>{sellingPrice}원</HeadingText>
        </ItemWrapper>
      </>
      <Divider color="#ededed" />
      <Spacing height={32} />
      <Button type="submit" fontSize="18px" fontWeight={700}>
        {sellingPrice}원 결제하기
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  border-left: 1px solid #ededed;
  border-right: 1px solid #ededed;
  padding: 16px;
`;

const Title = styled.h6`
  padding: 24px 0 20px;
`;

const Subtitle = styled.h3`
  padding: 16px;
  border-bottom: 1px solid #ededed;
  font-weight: 700;
  font-size: 15px;
  line-height: 24px;
`;

const ListWrapper = styled.ul`
  padding: 16px 16px 4px;
  list-style: none;
  font-size: 14px;
  line-height: 1.5;

  .list_item {
    overflow: hidden;
    padding-bottom: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const ItemWrapper = styled.div`
  display: flex;
  margin: 0 16px;
  padding: 16px 0;
  border-top: 1px solid #f5f5f5;
  justify-content: space-between;
  align-items: center;
`;
