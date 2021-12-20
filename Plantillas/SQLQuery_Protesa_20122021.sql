USE [CLINIC]
GO
/****** Object:  StoredProcedure [dbo].[SP_UpdateCostToInventory]    Script Date: 20/12/2021 01:40:07 ******/
DROP PROCEDURE [dbo].[SP_UpdateCostToInventory]
GO
/****** Object:  StoredProcedure [dbo].[SP_SAVESALE]    Script Date: 20/12/2021 01:40:07 ******/
DROP PROCEDURE [dbo].[SP_SAVESALE]
GO
/****** Object:  StoredProcedure [dbo].[SP_SAVEPURCHASE]    Script Date: 20/12/2021 01:40:07 ******/
DROP PROCEDURE [dbo].[SP_SAVEPURCHASE]
GO
/****** Object:  Table [dbo].[tbl_Recipes]    Script Date: 20/12/2021 01:40:07 ******/
--DROP TABLE [dbo].[tbl_Recipes]
--GO
/****** Object:  Table [dbo].[tbl_Recipes]    Script Date: 20/12/2021 01:40:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tbl_Recipes](
	[IdRecipe] [int] IDENTITY(1,1) NOT NULL,
	[ItemCode] [nvarchar](50) NULL,
	[ItemCodeInput] [nvarchar](50) NULL,
	[Description] [nvarchar](150) NULL,
	[Quantity] [decimal](18, 2) NULL,
	[UnitOfMeasurement] [nvarchar](50) NULL,
	[Cost] [decimal](18, 2) NULL,
	[CostXQuantity] [decimal](18, 2) NULL,
 CONSTRAINT [PK_tbl_Recipes] PRIMARY KEY CLUSTERED 
(
	[IdRecipe] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[tbl_Recipes] ON 
GO
INSERT [dbo].[tbl_Recipes] ([IdRecipe], [ItemCode], [ItemCodeInput], [Description], [Quantity], [UnitOfMeasurement], [Cost], [CostXQuantity]) VALUES (1, N'AC0015', N'AC0003', N'ACRILICO POLVO', CAST(41.00 AS Decimal(18, 2)), N'GRAMOS', CAST(0.01 AS Decimal(18, 2)), CAST(0.41 AS Decimal(18, 2)))
GO
INSERT [dbo].[tbl_Recipes] ([IdRecipe], [ItemCode], [ItemCodeInput], [Description], [Quantity], [UnitOfMeasurement], [Cost], [CostXQuantity]) VALUES (2, N'AC0015', N'AC0010', N'ACRILICO LIQUIDO', CAST(16.00 AS Decimal(18, 2)), N'ML', CAST(0.03 AS Decimal(18, 2)), CAST(0.48 AS Decimal(18, 2)))
GO
INSERT [dbo].[tbl_Recipes] ([IdRecipe], [ItemCode], [ItemCodeInput], [Description], [Quantity], [UnitOfMeasurement], [Cost], [CostXQuantity]) VALUES (3, N'AC0015', N'DI0024', N'DIENTES', CAST(14.00 AS Decimal(18, 2)), N'UNITARIO', CAST(0.24 AS Decimal(18, 2)), CAST(3.30 AS Decimal(18, 2)))
GO
INSERT [dbo].[tbl_Recipes] ([IdRecipe], [ItemCode], [ItemCodeInput], [Description], [Quantity], [UnitOfMeasurement], [Cost], [CostXQuantity]) VALUES (4, N'AC0015', N'CE0002', N'CERAS ROSADAS', CAST(1.00 AS Decimal(18, 2)), N'UNITARIO', CAST(0.49 AS Decimal(18, 2)), CAST(0.49 AS Decimal(18, 2)))
GO
INSERT [dbo].[tbl_Recipes] ([IdRecipe], [ItemCode], [ItemCodeInput], [Description], [Quantity], [UnitOfMeasurement], [Cost], [CostXQuantity]) VALUES (5, N'AC0015', N'YE0001', N'YESO PIEDRA', CAST(4.00 AS Decimal(18, 2)), N'GRAMOS', CAST(0.01 AS Decimal(18, 2)), CAST(0.04 AS Decimal(18, 2)))
GO
INSERT [dbo].[tbl_Recipes] ([IdRecipe], [ItemCode], [ItemCodeInput], [Description], [Quantity], [UnitOfMeasurement], [Cost], [CostXQuantity]) VALUES (6, N'AC0015', N'YE0004', N'CALCINADO', CAST(311.00 AS Decimal(18, 2)), N'GRAMOS', CAST(0.01 AS Decimal(18, 2)), CAST(3.11 AS Decimal(18, 2)))
GO
INSERT [dbo].[tbl_Recipes] ([IdRecipe], [ItemCode], [ItemCodeInput], [Description], [Quantity], [UnitOfMeasurement], [Cost], [CostXQuantity]) VALUES (7, N'AC0015', N'RU0001', N'PIEDRA MIZY', CAST(1.00 AS Decimal(18, 2)), N'UNITARIO', CAST(0.72 AS Decimal(18, 2)), CAST(0.72 AS Decimal(18, 2)))
GO
INSERT [dbo].[tbl_Recipes] ([IdRecipe], [ItemCode], [ItemCodeInput], [Description], [Quantity], [UnitOfMeasurement], [Cost], [CostXQuantity]) VALUES (8, N'AC0015', N'RU0004', N'FELPA', CAST(1.00 AS Decimal(18, 2)), N'UNITARIO', CAST(0.38 AS Decimal(18, 2)), CAST(0.38 AS Decimal(18, 2)))
GO
INSERT [dbo].[tbl_Recipes] ([IdRecipe], [ItemCode], [ItemCodeInput], [Description], [Quantity], [UnitOfMeasurement], [Cost], [CostXQuantity]) VALUES (9, N'AC0015', N'PL0009', N'POLYCRIL', CAST(1.00 AS Decimal(18, 2)), N'GRAMOS', CAST(0.01 AS Decimal(18, 2)), CAST(0.01 AS Decimal(18, 2)))
GO
INSERT [dbo].[tbl_Recipes] ([IdRecipe], [ItemCode], [ItemCodeInput], [Description], [Quantity], [UnitOfMeasurement], [Cost], [CostXQuantity]) VALUES (10, N'AC0015', N'SE0002', N'SEPARADOR DE YESO', CAST(1.00 AS Decimal(18, 2)), N'ML', CAST(0.01 AS Decimal(18, 2)), CAST(0.01 AS Decimal(18, 2)))
GO
INSERT [dbo].[tbl_Recipes] ([IdRecipe], [ItemCode], [ItemCodeInput], [Description], [Quantity], [UnitOfMeasurement], [Cost], [CostXQuantity]) VALUES (11, N'AC0015', N'AL0001', N'ALGINATO', CAST(24.00 AS Decimal(18, 2)), N'GRAMOS', CAST(0.02 AS Decimal(18, 2)), CAST(0.48 AS Decimal(18, 2)))
GO
INSERT [dbo].[tbl_Recipes] ([IdRecipe], [ItemCode], [ItemCodeInput], [Description], [Quantity], [UnitOfMeasurement], [Cost], [CostXQuantity]) VALUES (12, N'YA0001', N'AC0007', N'ACRILICO POLVO', CAST(10.00 AS Decimal(18, 2)), N'GRAMOS', CAST(0.01 AS Decimal(18, 2)), CAST(0.10 AS Decimal(18, 2)))
GO
INSERT [dbo].[tbl_Recipes] ([IdRecipe], [ItemCode], [ItemCodeInput], [Description], [Quantity], [UnitOfMeasurement], [Cost], [CostXQuantity]) VALUES (13, N'YA0001', N'AC0010', N'ACRILICO LIQUIDO', CAST(5.00 AS Decimal(18, 2)), N'ML', CAST(0.03 AS Decimal(18, 2)), CAST(0.30 AS Decimal(18, 2)))
GO
INSERT [dbo].[tbl_Recipes] ([IdRecipe], [ItemCode], [ItemCodeInput], [Description], [Quantity], [UnitOfMeasurement], [Cost], [CostXQuantity]) VALUES (14, N'YA0001', N'YE0001', N'YESO PIEDRA', CAST(4.00 AS Decimal(18, 2)), N'GRAMOS', CAST(0.01 AS Decimal(18, 2)), CAST(0.04 AS Decimal(18, 2)))
GO
INSERT [dbo].[tbl_Recipes] ([IdRecipe], [ItemCode], [ItemCodeInput], [Description], [Quantity], [UnitOfMeasurement], [Cost], [CostXQuantity]) VALUES (15, N'YA0001', N'DI0001', N'DISCO DE CORTE', CAST(1.00 AS Decimal(18, 2)), N'UNITARIO', CAST(0.30 AS Decimal(18, 2)), CAST(0.30 AS Decimal(18, 2)))
GO
INSERT [dbo].[tbl_Recipes] ([IdRecipe], [ItemCode], [ItemCodeInput], [Description], [Quantity], [UnitOfMeasurement], [Cost], [CostXQuantity]) VALUES (16, N'YA0001', N'PL0009', N'POLICRYL', CAST(1.00 AS Decimal(18, 2)), N'GRAMOS', CAST(0.01 AS Decimal(18, 2)), CAST(0.01 AS Decimal(18, 2)))
GO
INSERT [dbo].[tbl_Recipes] ([IdRecipe], [ItemCode], [ItemCodeInput], [Description], [Quantity], [UnitOfMeasurement], [Cost], [CostXQuantity]) VALUES (17, N'AC0018', N'AC0003', N'ACRILICO POLVO', CAST(18.00 AS Decimal(18, 2)), N'GRAMOS', CAST(0.01 AS Decimal(18, 2)), CAST(0.18 AS Decimal(18, 2)))
GO
INSERT [dbo].[tbl_Recipes] ([IdRecipe], [ItemCode], [ItemCodeInput], [Description], [Quantity], [UnitOfMeasurement], [Cost], [CostXQuantity]) VALUES (18, N'AC0018', N'AC0010', N'ACRILICO LIQUIDO', CAST(10.00 AS Decimal(18, 2)), N'ML', CAST(0.03 AS Decimal(18, 2)), CAST(0.30 AS Decimal(18, 2)))
GO
INSERT [dbo].[tbl_Recipes] ([IdRecipe], [ItemCode], [ItemCodeInput], [Description], [Quantity], [UnitOfMeasurement], [Cost], [CostXQuantity]) VALUES (19, N'AC0018', N'DI0024', N'DIENTES', CAST(14.00 AS Decimal(18, 2)), N'UNITARIO', CAST(0.24 AS Decimal(18, 2)), CAST(3.36 AS Decimal(18, 2)))
GO
INSERT [dbo].[tbl_Recipes] ([IdRecipe], [ItemCode], [ItemCodeInput], [Description], [Quantity], [UnitOfMeasurement], [Cost], [CostXQuantity]) VALUES (20, N'AC0018', N'CE0002', N'1 CERAS ROSADAS', CAST(1.00 AS Decimal(18, 2)), N'UNITARIO', CAST(0.49 AS Decimal(18, 2)), CAST(0.49 AS Decimal(18, 2)))
GO
INSERT [dbo].[tbl_Recipes] ([IdRecipe], [ItemCode], [ItemCodeInput], [Description], [Quantity], [UnitOfMeasurement], [Cost], [CostXQuantity]) VALUES (21, N'AC0018', N'YE0001', N'YESO PIEDRA', CAST(4.00 AS Decimal(18, 2)), N'GRAMOS', CAST(0.01 AS Decimal(18, 2)), CAST(0.04 AS Decimal(18, 2)))
GO
INSERT [dbo].[tbl_Recipes] ([IdRecipe], [ItemCode], [ItemCodeInput], [Description], [Quantity], [UnitOfMeasurement], [Cost], [CostXQuantity]) VALUES (22, N'AC0018', N'YE0004', N'CALCINADO', CAST(155.00 AS Decimal(18, 2)), N'GRAMOS', CAST(0.01 AS Decimal(18, 2)), CAST(1.55 AS Decimal(18, 2)))
GO
INSERT [dbo].[tbl_Recipes] ([IdRecipe], [ItemCode], [ItemCodeInput], [Description], [Quantity], [UnitOfMeasurement], [Cost], [CostXQuantity]) VALUES (23, N'AC0018', N'RU0001', N'PIEDRA MIZY', CAST(1.00 AS Decimal(18, 2)), N'UNITARIO', CAST(0.72 AS Decimal(18, 2)), CAST(0.72 AS Decimal(18, 2)))
GO
INSERT [dbo].[tbl_Recipes] ([IdRecipe], [ItemCode], [ItemCodeInput], [Description], [Quantity], [UnitOfMeasurement], [Cost], [CostXQuantity]) VALUES (24, N'AC0018', N'RU0004', N'FELPA', CAST(1.00 AS Decimal(18, 2)), N'UNITARIO', CAST(0.38 AS Decimal(18, 2)), CAST(0.38 AS Decimal(18, 2)))
GO
INSERT [dbo].[tbl_Recipes] ([IdRecipe], [ItemCode], [ItemCodeInput], [Description], [Quantity], [UnitOfMeasurement], [Cost], [CostXQuantity]) VALUES (25, N'AC0018', N'PL0009', N'POLYCRIL', CAST(1.00 AS Decimal(18, 2)), N'GRAMOS', CAST(0.01 AS Decimal(18, 2)), CAST(0.01 AS Decimal(18, 2)))
GO
INSERT [dbo].[tbl_Recipes] ([IdRecipe], [ItemCode], [ItemCodeInput], [Description], [Quantity], [UnitOfMeasurement], [Cost], [CostXQuantity]) VALUES (26, N'AC0018', N'SE0002', N'SEPARADOR DE YESO', CAST(1.00 AS Decimal(18, 2)), N'ML', CAST(0.01 AS Decimal(18, 2)), CAST(0.01 AS Decimal(18, 2)))
GO
INSERT [dbo].[tbl_Recipes] ([IdRecipe], [ItemCode], [ItemCodeInput], [Description], [Quantity], [UnitOfMeasurement], [Cost], [CostXQuantity]) VALUES (27, N'AC0018', N'', N'GANCHOS WHIPLA', CAST(1.00 AS Decimal(18, 2)), N'CENTIMETROS', CAST(0.01 AS Decimal(18, 2)), CAST(0.01 AS Decimal(18, 2)))
GO
INSERT [dbo].[tbl_Recipes] ([IdRecipe], [ItemCode], [ItemCodeInput], [Description], [Quantity], [UnitOfMeasurement], [Cost], [CostXQuantity]) VALUES (28, N'RE0002', N'AC0014', N'   LIQUIDO SOFTY', CAST(3.00 AS Decimal(18, 2)), N'ML', CAST(0.44 AS Decimal(18, 2)), CAST(1.32 AS Decimal(18, 2)))
GO
INSERT [dbo].[tbl_Recipes] ([IdRecipe], [ItemCode], [ItemCodeInput], [Description], [Quantity], [UnitOfMeasurement], [Cost], [CostXQuantity]) VALUES (29, N'RE0002', N'AC0014', N'POLVO SOFTY', CAST(6.00 AS Decimal(18, 2)), N'GRAMOS', CAST(0.22 AS Decimal(18, 2)), CAST(1.32 AS Decimal(18, 2)))
GO
INSERT [dbo].[tbl_Recipes] ([IdRecipe], [ItemCode], [ItemCodeInput], [Description], [Quantity], [UnitOfMeasurement], [Cost], [CostXQuantity]) VALUES (30, N'AC0001 ', N'CU0001', N'CUBOS DE METAL FLEXICASTV', CAST(1.00 AS Decimal(18, 2)), N'UNITARIO', CAST(1.15 AS Decimal(18, 2)), CAST(1.15 AS Decimal(18, 2)))
GO
INSERT [dbo].[tbl_Recipes] ([IdRecipe], [ItemCode], [ItemCodeInput], [Description], [Quantity], [UnitOfMeasurement], [Cost], [CostXQuantity]) VALUES (31, N'AC0001 ', N'AC0010', N'ACRILICO LIQUIDO', CAST(10.00 AS Decimal(18, 2)), N'ML', CAST(0.03 AS Decimal(18, 2)), CAST(0.30 AS Decimal(18, 2)))
GO
INSERT [dbo].[tbl_Recipes] ([IdRecipe], [ItemCode], [ItemCodeInput], [Description], [Quantity], [UnitOfMeasurement], [Cost], [CostXQuantity]) VALUES (32, N'AC0001 ', N'AC0007', N'ACRILICO POLVO', CAST(18.00 AS Decimal(18, 2)), N'GRAMOS', CAST(0.01 AS Decimal(18, 2)), CAST(0.18 AS Decimal(18, 2)))
GO
INSERT [dbo].[tbl_Recipes] ([IdRecipe], [ItemCode], [ItemCodeInput], [Description], [Quantity], [UnitOfMeasurement], [Cost], [CostXQuantity]) VALUES (33, N'AC0001 ', N'YE0001', N'YESO PIEDRA', CAST(4.00 AS Decimal(18, 2)), N'GRAMOS', CAST(0.01 AS Decimal(18, 2)), CAST(0.04 AS Decimal(18, 2)))
GO
INSERT [dbo].[tbl_Recipes] ([IdRecipe], [ItemCode], [ItemCodeInput], [Description], [Quantity], [UnitOfMeasurement], [Cost], [CostXQuantity]) VALUES (34, N'AC0001 ', N'CE0001', N'CERA AZUL', CAST(1.00 AS Decimal(18, 2)), N'UNITARIO', CAST(0.49 AS Decimal(18, 2)), CAST(0.04 AS Decimal(18, 2)))
GO
INSERT [dbo].[tbl_Recipes] ([IdRecipe], [ItemCode], [ItemCodeInput], [Description], [Quantity], [UnitOfMeasurement], [Cost], [CostXQuantity]) VALUES (35, N'AC0001', N'DI0001', N'DISCO DE  CORTE 1 1/4 X 0.062 31.75 X 1.57 MM DENTORIUM', CAST(1.00 AS Decimal(18, 2)), N'UNITARIO', CAST(0.30 AS Decimal(18, 2)), CAST(0.30 AS Decimal(18, 2)))
GO
INSERT [dbo].[tbl_Recipes] ([IdRecipe], [ItemCode], [ItemCodeInput], [Description], [Quantity], [UnitOfMeasurement], [Cost], [CostXQuantity]) VALUES (36, N'VA0002', N'PA0006', N' PARCIAL FLEX', CAST(1.00 AS Decimal(18, 2)), N'UNITARIO', CAST(13.20 AS Decimal(18, 2)), CAST(13.20 AS Decimal(18, 2)))
GO
INSERT [dbo].[tbl_Recipes] ([IdRecipe], [ItemCode], [ItemCodeInput], [Description], [Quantity], [UnitOfMeasurement], [Cost], [CostXQuantity]) VALUES (37, N'VA0002', N'DI0024', N'DIENTES', CAST(14.00 AS Decimal(18, 2)), N'UNITARIO', CAST(0.24 AS Decimal(18, 2)), CAST(3.30 AS Decimal(18, 2)))
GO
INSERT [dbo].[tbl_Recipes] ([IdRecipe], [ItemCode], [ItemCodeInput], [Description], [Quantity], [UnitOfMeasurement], [Cost], [CostXQuantity]) VALUES (38, N'VA0002', N'CE0002', N'1 CERA ROSADA', CAST(1.00 AS Decimal(18, 2)), N'UNITARIO', CAST(0.49 AS Decimal(18, 2)), CAST(0.49 AS Decimal(18, 2)))
GO
INSERT [dbo].[tbl_Recipes] ([IdRecipe], [ItemCode], [ItemCodeInput], [Description], [Quantity], [UnitOfMeasurement], [Cost], [CostXQuantity]) VALUES (39, N'VA0002', N'YE0004', N'CALCINADO', CAST(311.00 AS Decimal(18, 2)), N'GRAMOS', CAST(0.01 AS Decimal(18, 2)), CAST(3.11 AS Decimal(18, 2)))
GO
INSERT [dbo].[tbl_Recipes] ([IdRecipe], [ItemCode], [ItemCodeInput], [Description], [Quantity], [UnitOfMeasurement], [Cost], [CostXQuantity]) VALUES (40, N'VA0002', N'RU0001', N'PEDRA MIZZY', CAST(1.00 AS Decimal(18, 2)), N'UNITARIO', CAST(0.72 AS Decimal(18, 2)), CAST(0.72 AS Decimal(18, 2)))
GO
INSERT [dbo].[tbl_Recipes] ([IdRecipe], [ItemCode], [ItemCodeInput], [Description], [Quantity], [UnitOfMeasurement], [Cost], [CostXQuantity]) VALUES (41, N'VA0002', N'RU0004', N'FELPA', CAST(1.00 AS Decimal(18, 2)), N'UNITARIO', CAST(0.38 AS Decimal(18, 2)), CAST(0.38 AS Decimal(18, 2)))
GO
INSERT [dbo].[tbl_Recipes] ([IdRecipe], [ItemCode], [ItemCodeInput], [Description], [Quantity], [UnitOfMeasurement], [Cost], [CostXQuantity]) VALUES (42, N'VA0002', N'YE0001', N'YESO PIEDRA', CAST(4.00 AS Decimal(18, 2)), N'GRAMOS', CAST(0.01 AS Decimal(18, 2)), CAST(0.04 AS Decimal(18, 2)))
GO
INSERT [dbo].[tbl_Recipes] ([IdRecipe], [ItemCode], [ItemCodeInput], [Description], [Quantity], [UnitOfMeasurement], [Cost], [CostXQuantity]) VALUES (43, N'VA0002', N'SE0001', N'SEPARADOR DE FLEXIBLE', CAST(1.00 AS Decimal(18, 2)), N'ML', CAST(0.01 AS Decimal(18, 2)), CAST(0.01 AS Decimal(18, 2)))
GO
INSERT [dbo].[tbl_Recipes] ([IdRecipe], [ItemCode], [ItemCodeInput], [Description], [Quantity], [UnitOfMeasurement], [Cost], [CostXQuantity]) VALUES (44, N'VA0002', N'SE0002', N'SEPARADOR DE YESO', CAST(1.00 AS Decimal(18, 2)), N'ML', CAST(0.01 AS Decimal(18, 2)), CAST(0.01 AS Decimal(18, 2)))
GO
INSERT [dbo].[tbl_Recipes] ([IdRecipe], [ItemCode], [ItemCodeInput], [Description], [Quantity], [UnitOfMeasurement], [Cost], [CostXQuantity]) VALUES (45, N'PO0056', N'YE0001', N'YESO PIEDRA', CAST(4.00 AS Decimal(18, 2)), N'GRAMOS', CAST(0.01 AS Decimal(18, 2)), CAST(0.04 AS Decimal(18, 2)))
GO
INSERT [dbo].[tbl_Recipes] ([IdRecipe], [ItemCode], [ItemCodeInput], [Description], [Quantity], [UnitOfMeasurement], [Cost], [CostXQuantity]) VALUES (46, N'PO0056', N'CE0001', N'CERA AZUL', CAST(1.00 AS Decimal(18, 2)), N'UNITARIO', CAST(0.49 AS Decimal(18, 2)), CAST(0.49 AS Decimal(18, 2)))
GO
INSERT [dbo].[tbl_Recipes] ([IdRecipe], [ItemCode], [ItemCodeInput], [Description], [Quantity], [UnitOfMeasurement], [Cost], [CostXQuantity]) VALUES (47, N'PO0056', N'BI0001', N'BISTURI', CAST(1.00 AS Decimal(18, 2)), N'UNITARIO', CAST(0.50 AS Decimal(18, 2)), CAST(0.50 AS Decimal(18, 2)))
GO
INSERT [dbo].[tbl_Recipes] ([IdRecipe], [ItemCode], [ItemCodeInput], [Description], [Quantity], [UnitOfMeasurement], [Cost], [CostXQuantity]) VALUES (48, N'PO0056', N'CU0003', N'CUBOS DE SUPREMACASTV', CAST(1.00 AS Decimal(18, 2)), N'UNITARIO', CAST(1.33 AS Decimal(18, 2)), CAST(1.33 AS Decimal(18, 2)))
GO
INSERT [dbo].[tbl_Recipes] ([IdRecipe], [ItemCode], [ItemCodeInput], [Description], [Quantity], [UnitOfMeasurement], [Cost], [CostXQuantity]) VALUES (49, N'PO0056', N'PO0062', N'POLVO X20', CAST(100.00 AS Decimal(18, 2)), N'GRAMOS', CAST(0.01 AS Decimal(18, 2)), CAST(1.00 AS Decimal(18, 2)))
GO
INSERT [dbo].[tbl_Recipes] ([IdRecipe], [ItemCode], [ItemCodeInput], [Description], [Quantity], [UnitOfMeasurement], [Cost], [CostXQuantity]) VALUES (50, N'PO0056', N'LI0005', N'LIQUIDO X20', CAST(22.00 AS Decimal(18, 2)), N'ML', CAST(0.01 AS Decimal(18, 2)), CAST(0.22 AS Decimal(18, 2)))
GO
INSERT [dbo].[tbl_Recipes] ([IdRecipe], [ItemCode], [ItemCodeInput], [Description], [Quantity], [UnitOfMeasurement], [Cost], [CostXQuantity]) VALUES (51, N'PO0056', N'FR00013', N'FRESAS 703', CAST(1.00 AS Decimal(18, 2)), N'UNITARIO', CAST(2.12 AS Decimal(18, 2)), CAST(2.12 AS Decimal(18, 2)))
GO
INSERT [dbo].[tbl_Recipes] ([IdRecipe], [ItemCode], [ItemCodeInput], [Description], [Quantity], [UnitOfMeasurement], [Cost], [CostXQuantity]) VALUES (52, N'PO0056', N'DI0002', N'DISCO DE CROMO', CAST(1.00 AS Decimal(18, 2)), N'UNITARIO', CAST(0.30 AS Decimal(18, 2)), CAST(0.30 AS Decimal(18, 2)))
GO
INSERT [dbo].[tbl_Recipes] ([IdRecipe], [ItemCode], [ItemCodeInput], [Description], [Quantity], [UnitOfMeasurement], [Cost], [CostXQuantity]) VALUES (53, N'PO0056', N'PI0004', N'PIEDRA BLANCA', CAST(1.00 AS Decimal(18, 2)), N'UNITARIO', CAST(0.28 AS Decimal(18, 2)), CAST(0.28 AS Decimal(18, 2)))
GO
INSERT [dbo].[tbl_Recipes] ([IdRecipe], [ItemCode], [ItemCodeInput], [Description], [Quantity], [UnitOfMeasurement], [Cost], [CostXQuantity]) VALUES (54, N'PO0056', N'AR0001', N'ARENA DE SAMBLASTE', CAST(1.00 AS Decimal(18, 2)), N'GRAMOS', CAST(0.01 AS Decimal(18, 2)), CAST(0.01 AS Decimal(18, 2)))
GO
INSERT [dbo].[tbl_Recipes] ([IdRecipe], [ItemCode], [ItemCodeInput], [Description], [Quantity], [UnitOfMeasurement], [Cost], [CostXQuantity]) VALUES (55, N'PO0056', N'AL0001', N'ALCOHOL', CAST(1.00 AS Decimal(18, 2)), N'ML', CAST(0.02 AS Decimal(18, 2)), CAST(0.02 AS Decimal(18, 2)))
GO
INSERT [dbo].[tbl_Recipes] ([IdRecipe], [ItemCode], [ItemCodeInput], [Description], [Quantity], [UnitOfMeasurement], [Cost], [CostXQuantity]) VALUES (56, N'PO0056', N'BO0001', N'AGUA DEMINERALIZADA', CAST(1.00 AS Decimal(18, 2)), N'ML', CAST(0.02 AS Decimal(18, 2)), CAST(0.02 AS Decimal(18, 2)))
GO
INSERT [dbo].[tbl_Recipes] ([IdRecipe], [ItemCode], [ItemCodeInput], [Description], [Quantity], [UnitOfMeasurement], [Cost], [CostXQuantity]) VALUES (57, N'PO0056', N'GL0001', N'GLAZER POLVO', CAST(1.00 AS Decimal(18, 2)), N'GRAMOS', CAST(0.08 AS Decimal(18, 2)), CAST(0.08 AS Decimal(18, 2)))
GO
INSERT [dbo].[tbl_Recipes] ([IdRecipe], [ItemCode], [ItemCodeInput], [Description], [Quantity], [UnitOfMeasurement], [Cost], [CostXQuantity]) VALUES (58, N'PO0056', N'LI0001', N'GLAZER LIQUIDO', CAST(1.00 AS Decimal(18, 2)), N'ML', CAST(0.08 AS Decimal(18, 2)), CAST(0.08 AS Decimal(18, 2)))
GO
INSERT [dbo].[tbl_Recipes] ([IdRecipe], [ItemCode], [ItemCodeInput], [Description], [Quantity], [UnitOfMeasurement], [Cost], [CostXQuantity]) VALUES (59, N'PO0056', N'PO0009', N'DENTINA', CAST(1.00 AS Decimal(18, 2)), N'GRAMOS', CAST(1.11 AS Decimal(18, 2)), CAST(1.11 AS Decimal(18, 2)))
GO
INSERT [dbo].[tbl_Recipes] ([IdRecipe], [ItemCode], [ItemCodeInput], [Description], [Quantity], [UnitOfMeasurement], [Cost], [CostXQuantity]) VALUES (60, N'PO0056', N'PO0028', N'OPACADOR', CAST(1.00 AS Decimal(18, 2)), N'GRAMOS', CAST(1.11 AS Decimal(18, 2)), CAST(1.11 AS Decimal(18, 2)))
GO
INSERT [dbo].[tbl_Recipes] ([IdRecipe], [ItemCode], [ItemCodeInput], [Description], [Quantity], [UnitOfMeasurement], [Cost], [CostXQuantity]) VALUES (61, N'PO0056', N'EN0001', N'INCISAL', CAST(1.00 AS Decimal(18, 2)), N'GRAMOS', CAST(1.11 AS Decimal(18, 2)), CAST(1.11 AS Decimal(18, 2)))
GO
INSERT [dbo].[tbl_Recipes] ([IdRecipe], [ItemCode], [ItemCodeInput], [Description], [Quantity], [UnitOfMeasurement], [Cost], [CostXQuantity]) VALUES (62, N'PO0056', N'PI0007', N'FLESA TRONCOCONICA', CAST(1.00 AS Decimal(18, 2)), N'UNITARIO', CAST(0.28 AS Decimal(18, 2)), CAST(0.28 AS Decimal(18, 2)))
GO
INSERT [dbo].[tbl_Recipes] ([IdRecipe], [ItemCode], [ItemCodeInput], [Description], [Quantity], [UnitOfMeasurement], [Cost], [CostXQuantity]) VALUES (63, N'PO0056', N'DI0021', N'KIT DE PULIDO DE CERÁMICA', CAST(1.00 AS Decimal(18, 2)), N'UNITARIO', CAST(0.01 AS Decimal(18, 2)), CAST(0.01 AS Decimal(18, 2)))
GO
INSERT [dbo].[tbl_Recipes] ([IdRecipe], [ItemCode], [ItemCodeInput], [Description], [Quantity], [UnitOfMeasurement], [Cost], [CostXQuantity]) VALUES (64, N'CO0001', N'CR0009', N'CERAMAGE', CAST(1.00 AS Decimal(18, 2)), N'ML', CAST(7.60 AS Decimal(18, 2)), CAST(7.60 AS Decimal(18, 2)))
GO
INSERT [dbo].[tbl_Recipes] ([IdRecipe], [ItemCode], [ItemCodeInput], [Description], [Quantity], [UnitOfMeasurement], [Cost], [CostXQuantity]) VALUES (65, N'CO0001', N'DI0010', N'KIT DE PULIDO CERAMAGE', CAST(1.00 AS Decimal(18, 2)), N'UNITARIO', CAST(0.39 AS Decimal(18, 2)), CAST(0.39 AS Decimal(18, 2)))
GO
INSERT [dbo].[tbl_Recipes] ([IdRecipe], [ItemCode], [ItemCodeInput], [Description], [Quantity], [UnitOfMeasurement], [Cost], [CostXQuantity]) VALUES (66, N'CO0001', N'LI0004', N'OXY BARRIER LÍQUIDO', CAST(1.00 AS Decimal(18, 2)), N'ML', CAST(3.17 AS Decimal(18, 2)), CAST(3.17 AS Decimal(18, 2)))
GO
INSERT [dbo].[tbl_Recipes] ([IdRecipe], [ItemCode], [ItemCodeInput], [Description], [Quantity], [UnitOfMeasurement], [Cost], [CostXQuantity]) VALUES (67, N'CO0001', N'SE0001', N'SEPARADOR DE CERAMAGE', CAST(1.00 AS Decimal(18, 2)), N'ML', CAST(12.75 AS Decimal(18, 2)), CAST(12.75 AS Decimal(18, 2)))
GO
INSERT [dbo].[tbl_Recipes] ([IdRecipe], [ItemCode], [ItemCodeInput], [Description], [Quantity], [UnitOfMeasurement], [Cost], [CostXQuantity]) VALUES (68, N'CO0001', N'DS0001', N'ESPACIADOR', CAST(1.00 AS Decimal(18, 2)), N'ML', CAST(0.50 AS Decimal(18, 2)), CAST(0.20 AS Decimal(18, 2)))
GO
INSERT [dbo].[tbl_Recipes] ([IdRecipe], [ItemCode], [ItemCodeInput], [Description], [Quantity], [UnitOfMeasurement], [Cost], [CostXQuantity]) VALUES (69, N'CO0001', N'DS0001', N'SELLADOR', CAST(1.00 AS Decimal(18, 2)), N'ML', CAST(0.50 AS Decimal(18, 2)), CAST(0.20 AS Decimal(18, 2)))
GO
INSERT [dbo].[tbl_Recipes] ([IdRecipe], [ItemCode], [ItemCodeInput], [Description], [Quantity], [UnitOfMeasurement], [Cost], [CostXQuantity]) VALUES (70, N'CO0001', N'YE0001', N'YESO PIEDRA', CAST(4.00 AS Decimal(18, 2)), N'GRAMOS', CAST(0.01 AS Decimal(18, 2)), CAST(0.04 AS Decimal(18, 2)))
GO
INSERT [dbo].[tbl_Recipes] ([IdRecipe], [ItemCode], [ItemCodeInput], [Description], [Quantity], [UnitOfMeasurement], [Cost], [CostXQuantity]) VALUES (71, N'CO0001', N'CR0017', N'INCISALES', CAST(1.00 AS Decimal(18, 2)), N'GRAMOS', CAST(7.60 AS Decimal(18, 2)), CAST(7.60 AS Decimal(18, 2)))
GO
INSERT [dbo].[tbl_Recipes] ([IdRecipe], [ItemCode], [ItemCodeInput], [Description], [Quantity], [UnitOfMeasurement], [Cost], [CostXQuantity]) VALUES (72, N'CO0001', N'PE0001', N'PELOS DE CABRA', CAST(1.00 AS Decimal(18, 2)), N'UNITARIO', CAST(6.87 AS Decimal(18, 2)), CAST(6.87 AS Decimal(18, 2)))
GO
SET IDENTITY_INSERT [dbo].[tbl_Recipes] OFF
GO
/****** Object:  StoredProcedure [dbo].[SP_SAVEPURCHASE]    Script Date: 20/12/2021 01:40:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[SP_SAVEPURCHASE]
	-- Add the parameters for the stored procedure here
	@IPurchase int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	DECLARE @Status NVARCHAR(1)= (Select Status from tbl_Purchase WHERE IdPurchase = @IPurchase);
	if @Status='E'
		BEGIN
			DECLARE @ItemCode NVARCHAR(50),  @Quantity int, @ItemCodeInsumo NVARCHAR(50), @QuantityInsumo DECIMAL(18,2);  
  
			DECLARE vendor_cursor CURSOR FOR   
			SELECT ItemCode, Quantity  FROM tbl_PurchaseDetail	WHERE IdPurchase = @IPurchase	ORDER BY LineNume;    
			OPEN vendor_cursor    
			FETCH NEXT FROM vendor_cursor INTO @ItemCode, @Quantity    
			WHILE @@FETCH_STATUS = 0  
			BEGIN  
				UPDATE tbl_Inventory SET [UnitsOnHand] = [UnitsOnHand] + @Quantity WHERE ItemCode=@ItemCode;

                -- DECLARE product_cursor CURSOR FOR   
                -- SELECT ItemCode, Quantity FROM tbl_Recipes WHERE ItemCode=@ItemCode      
                -- OPEN product_cursor  FETCH NEXT FROM product_cursor INTO @ItemCodeInsumo, @QuantityInsumo             
                -- WHILE @@FETCH_STATUS = 0  
                -- BEGIN  
                --     UPDATE tbl_Inventory SET [UnitsOnHand] = [UnitsOnHand] + @QuantityInsumo WHERE ItemCode=@ItemCodeInsumo;
                    
                --     FETCH NEXT FROM product_cursor INTO @ItemCodeInsumo, @QuantityInsumo 
                -- END              
                -- CLOSE product_cursor  
                -- DEALLOCATE product_cursor 

				FETCH NEXT FROM vendor_cursor INTO @ItemCode, @Quantity  
			END   
			CLOSE vendor_cursor;  
			DEALLOCATE vendor_cursor;  

			UPDATE tbl_Purchase SET Status='R' WHERE IdPurchase = @IPurchase;
		END


END
GO
/****** Object:  StoredProcedure [dbo].[SP_SAVESALE]    Script Date: 20/12/2021 01:40:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[SP_SAVESALE]
	-- Add the parameters for the stored procedure here
	@ISale int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	DECLARE @Status NVARCHAR(1)= (Select Status from tbl_Sales WHERE IdSale=@ISale);
	if @Status='E'
		BEGIN
			DECLARE @ItemCode NVARCHAR(50),  @Quantity int, @ItemCodeInsumo NVARCHAR(50), @QuantityInsumo DECIMAL(18,2);  
  
			DECLARE vendor_cursor CURSOR FOR   
			SELECT ItemCode, Quantity FROM tbl_SalesDetail WHERE IdSale = @ISale	ORDER BY LineNume;    
			OPEN vendor_cursor    
			FETCH NEXT FROM vendor_cursor  INTO @ItemCode, @Quantity    
			WHILE @@FETCH_STATUS = 0  
			BEGIN   
				UPDATE tbl_Inventory SET [UnitsOnHand] = [UnitsOnHand] - @Quantity WHERE ItemCode=@ItemCode;

                DECLARE product_cursor CURSOR FOR   
                SELECT ItemCode, Quantity FROM tbl_Recipes WHERE ItemCode=@ItemCode      
                OPEN product_cursor  FETCH NEXT FROM product_cursor INTO @ItemCodeInsumo, @QuantityInsumo             
                WHILE @@FETCH_STATUS = 0  
                BEGIN  
                    UPDATE tbl_Inventory SET [UnitsOnHand] = [UnitsOnHand] - @QuantityInsumo WHERE ItemCode=@ItemCodeInsumo;
                    
                    FETCH NEXT FROM product_cursor INTO @ItemCodeInsumo, @QuantityInsumo 
                END              
                CLOSE product_cursor  
                DEALLOCATE product_cursor 

				FETCH NEXT FROM vendor_cursor INTO @ItemCode, @Quantity  
			END   
			CLOSE vendor_cursor;  
			DEALLOCATE vendor_cursor;  

			UPDATE tbl_Sales SET Status='R' WHERE IdSale=@ISale;
		END
	


END
GO
/****** Object:  StoredProcedure [dbo].[SP_UpdateCostToInventory]    Script Date: 20/12/2021 01:40:07 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[SP_UpdateCostToInventory]
	-- Add the parameters for the stored procedure here
	@ItemCode nvarchar(50)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
  
    UPDATE tbl_Inventory set Cost=ISNULL((SELECT Sum(r.CostXQuantity) FROM tbl_Recipes r WHERE r.ItemCode=@ItemCode),Cost) 
    WHERE ItemCode = @ItemCode ;
    

END
GO

DECLARE @ItemCode NVARCHAR(50)

DECLARE product_cursor CURSOR FOR   
    SELECT ItemCode FROM tbl_Inventory WHERE ItemCode IN (SELECT ItemCode FROM tbl_Recipes)
  
    OPEN product_cursor  FETCH NEXT FROM product_cursor INTO @ItemCode  
  
    WHILE @@FETCH_STATUS = 0  
    BEGIN  
        UPDATE tbl_Inventory set Cost=ISNULL((SELECT Sum(r.CostXQuantity) FROM tbl_Recipes r WHERE r.ItemCode=@ItemCode),Cost) 
        WHERE ItemCode = @ItemCode
        
        FETCH NEXT FROM product_cursor INTO @ItemCode  
        END  
  
    CLOSE product_cursor  
    DEALLOCATE product_cursor  

	GO