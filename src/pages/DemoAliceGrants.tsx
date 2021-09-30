import React from 'react'
import styled from 'styled-components'
import { AccountButton } from '../components/account/AccountButton'
import { Container, MainContent, Section, SectionRow } from '../components/base/base'
import { AliceGrants } from '../components/Demo/AliceGrants'
import { Title } from '../typography/Title'
import { Text } from '../typography/Text'

export const DemoAliceGrants = () => {
  return (
    <MainContent>
      <Container>
        <Section>
          <SectionRow>
            <Title>Alice grants demo</Title>
            <AccountButton />
          </SectionRow>
          <SectionRow>
            <Text>Alice creates a blockchain policy and shares an encrypted message with Bob.</Text>
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
