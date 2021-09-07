import React from 'react'
import styled from 'styled-components'
import { Container, MainContent, Section, SectionRow } from '../components/base/base'
import { Title } from '../typography/Title'
import { EnricoEncrypts } from '../components/Enrico/EnricoEncrypts'

export const Enrico = () => {
  return (
    <MainContent>
      <Container>
        <Section>
          <SectionRow>
            <Title>Enrico</Title>
          </SectionRow>
          <TableGrid>
            <EnricoEncrypts />
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
