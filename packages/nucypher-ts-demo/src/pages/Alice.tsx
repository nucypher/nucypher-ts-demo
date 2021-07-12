import React from 'react'
import styled from 'styled-components'
import { AccountButton } from '../components/account/AccountButton'
import { Container, MainContent, Section, SectionRow } from '../components/base/base'
import { AliceGrants } from '../components/Alice/TransactionForms'
import { Title } from '../typography/Title'

export function Alice() {
  return (
    <MainContent>
      <Container>
        <Section>
          <SectionRow>
            <Title>Alice</Title>
            <AccountButton />
          </SectionRow>
          <TableGrid>
            <AliceGrants />
          </TableGrid>
        </Section>
      </Container>
    </MainContent>
  )
}

const TableGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`
