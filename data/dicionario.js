window.DICIONARIO = {
  SEVS: [
    { termo: 'Data de Notificação', sistema: 'SINAN', tabela: 'tb_notificacao', tipo: 'Data', descricao: 'Data em que o caso foi registrado no sistema de vigilância.', dominio: 'Campo temporal', origem: 'Sistema de origem', atualizacao: 'Mensal' },
    { termo: 'Faixa Etária', sistema: 'SIM', tabela: 'tb_obito', tipo: 'Texto', descricao: 'Faixa etária do paciente ou falecido, conforme padrão da vigilância.', dominio: 'Categoria', origem: 'Sistema de origem', atualizacao: 'Mensal' },
    { termo: 'Peso ao Nascer', sistema: 'SINASC', tabela: 'tb_nascimento', tipo: 'Número', descricao: 'Peso em gramas do recém-nascido no momento do nascimento.', dominio: 'Numérico', origem: 'Sistema de origem', atualizacao: 'Mensal' },
    { termo: 'Classificação Final', sistema: 'SINAN', tabela: 'tb_evolucao', tipo: 'Texto', descricao: 'Classificação final do caso após investigação epidemiológica.', dominio: 'Categoria', origem: 'Sistema de origem', atualizacao: 'Mensal' },
    { termo: 'Município de Residência', sistema: 'SIM', tabela: 'tb_obito', tipo: 'Texto', descricao: 'Município de residência do indivíduo no evento.', dominio: 'Geográfico', origem: 'Sistema de origem', atualizacao: 'Mensal' },
    { termo: 'Projeto REDCap', sistema: 'REDCap', tabela: 'tb_formulario', tipo: 'Texto', descricao: 'Identificador do formulário ou instrumento de coleta.', dominio: 'Estrutura aplicada', origem: 'Sistema de origem', atualizacao: 'Semanal' }
  ],
  SEAB: [
    { termo: 'Cobertura da UBS', sistema: 'e-SUS APS', tabela: 'tb_ubs', tipo: 'Número', descricao: 'Cobertura estimada da unidade de atenção básica no período.', dominio: 'Indicador', origem: 'Sistema de origem', atualizacao: 'Mensal' },
    { termo: 'Ficha de Atendimento', sistema: 'SISAB', tabela: 'tb_atendimento', tipo: 'Texto', descricao: 'Registro do atendimento realizado pelo profissional.', dominio: 'Documental', origem: 'Sistema de origem', atualizacao: 'Mensal' }
  ],
  SEAF: [
    { termo: 'Dispensa de Medicamento', sistema: 'SIAF', tabela: 'tb_dispensacao', tipo: 'Número', descricao: 'Quantidade dispensada para o paciente ou unidade.', dominio: 'Operacional', origem: 'Sistema de origem', atualizacao: 'Mensal' },
    { termo: 'Contratado', sistema: 'Prodesp', tabela: 'tb_compra', tipo: 'Texto', descricao: 'Identificação do fornecedor ou contrato vinculado ao item.', dominio: 'Compras', origem: 'Sistema de origem', atualizacao: 'Mensal' }
  ],
  SECOGE: [
    { termo: 'Indicador de Gestão', sistema: 'Painel Integrado', tabela: 'tb_indicador', tipo: 'Número', descricao: 'Valor do indicador de gerenciamento e acompanhamento institucional.', dominio: 'Indicador', origem: 'Sistema de origem', atualizacao: 'Mensal' }
  ],
  SEGTES: [
    { termo: 'Categoria Profissional', sistema: 'Gestão da Força de Trabalho', tabela: 'tb_profissional', tipo: 'Texto', descricao: 'Categoria profissional do quadro de saúde em atuação.', dominio: 'RH', origem: 'Sistema de origem', atualizacao: 'Mensal' }
  ],
  SEINFRA: [
    { termo: 'Tipo de Unidade', sistema: 'Cadastro da Rede Física', tabela: 'tb_unidade', tipo: 'Texto', descricao: 'Classificação da unidade de saúde conforme a rede física.', dominio: 'Infraestrutura', origem: 'Sistema de origem', atualizacao: 'Mensal' }
  ]
};
