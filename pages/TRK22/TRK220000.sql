USE [HdnTracking]
GO
/****** Object:  Table [dbo].[TRK22_Allocation]    Script Date: 6/9/2022 9:10:47 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TRK22_Allocation](
	[AllocationID] [int] IDENTITY(1,1) NOT NULL,
	[OrderID] [int] NULL,
	[InventoryID] [int] NULL,
	[AllocationQty] [int] NULL,
	[AllocationActive] [bit] NULL,
	[AllocationCreated] [datetime] NULL,
	[AllocationCreatedBy] [int] NULL,
	[AllocationUpdated] [datetime] NULL,
	[AllocationUpdatedBy] [int] NULL,
 CONSTRAINT [PK_TRK22_Allocation] PRIMARY KEY CLUSTERED 
(
	[AllocationID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TRK22_Cdd]    Script Date: 6/9/2022 9:10:47 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TRK22_Cdd](
	[CddID] [int] IDENTITY(1,1) NOT NULL,
	[CddGroup] [varchar](50) NULL,
	[CddSeries] [varchar](50) NULL,
	[CddItem] [varchar](25) NULL,
	[CddChipType] [varchar](25) NULL,
	[CddTolerance] [varchar](5) NULL,
	[CddWire] [varchar](10) NULL,
	[CddTurns] [varchar](10) NULL,
	[CddFrequency] [varchar](25) NULL,
	[CddInductanceUom] [varchar](10) NULL,
	[CddInductanceLowerLimit] [float] NULL,
	[CddInductanceNom] [float] NULL,
	[CddInductanceUpperLimit] [float] NULL,
	[CddDcrMax] [float] NULL,
	[CddDcrPacker] [float] NULL,
	[CddDcrUom] [varchar](10) NULL,
	[CddVerified] [datetime] NULL,
	[CddVerifiedBy] [int] NULL,
	[CddCreated] [datetime] NULL,
	[CddCreatedBy] [int] NULL,
	[CddUpdated] [datetime] NULL,
	[CddUpdatedBy] [int] NULL,
 CONSTRAINT [PK_TRK22_Cdd] PRIMARY KEY CLUSTERED 
(
	[CddID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TRK22_Inventory]    Script Date: 6/9/2022 9:10:47 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TRK22_Inventory](
	[InventoryID] [int] IDENTITY(1,1) NOT NULL,
	[TravelerID] [int] NULL,
	[InventoryQty] [int] NULL,
	[InventoryComplete] [bit] NULL,
	[InventoryActive] [bit] NULL,
	[InventoryCreated] [datetime] NULL,
	[InventoryCreatedBy] [int] NULL,
	[InventoryUpdated] [datetime] NULL,
	[InventoryUpdatedBy] [int] NULL,
 CONSTRAINT [PK_TRK22_Inventory] PRIMARY KEY CLUSTERED 
(
	[InventoryID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TRK22_Operation]    Script Date: 6/9/2022 9:10:47 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TRK22_Operation](
	[OperationID] [int] IDENTITY(1,1) NOT NULL,
	[OperationName] [varchar](25) NULL,
	[OperationActive] [bit] NULL,
	[OperationCreated] [datetime] NULL,
	[OperationCreatedBy] [int] NULL,
	[OperationUpdated] [datetime] NULL,
	[OperationUpdatedBy] [int] NULL,
 CONSTRAINT [PK_TRK22_Operation] PRIMARY KEY CLUSTERED 
(
	[OperationID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TRK22_OperationLoss]    Script Date: 6/9/2022 9:10:47 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TRK22_OperationLoss](
	[OperationLossID] [int] IDENTITY(1,1) NOT NULL,
	[OperationID] [int] NULL,
	[LossName] [varchar](50) NULL,
	[OperationLossCreated] [datetime] NULL,
	[OperationLossCreatedBy] [int] NULL,
	[OperationLossUpdated] [datetime] NULL,
	[OperationLossUpdatedBy] [int] NULL,
 CONSTRAINT [PK_TRK22_OperationLoss] PRIMARY KEY CLUSTERED 
(
	[OperationLossID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TRK22_Order]    Script Date: 6/9/2022 9:10:47 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TRK22_Order](
	[OrderID] [int] IDENTITY(1,1) NOT NULL,
	[CddID] [int] NULL,
	[OrderCustomer] [varchar](50) NULL,
	[OrderReference] [varchar](50) NULL,
	[OrderQtyRequested] [int] NULL,
	[OrderShipDate] [datetime] NULL,
	[OrderShipNow] [bit] NULL,
	[OrderCanceled] [bit] NULL,
	[OrderActive] [bit] NULL,
	[OrderCreated] [datetime] NULL,
	[OrderCreatedBy] [int] NULL,
	[OrderUpdated] [datetime] NULL,
	[OrderUpdatedBy] [int] NULL,
 CONSTRAINT [PK_TRK22_Order] PRIMARY KEY CLUSTERED 
(
	[OrderID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TRK22_Shipping]    Script Date: 6/9/2022 9:10:47 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TRK22_Shipping](
	[ShippingID] [int] IDENTITY(1,1) NOT NULL,
	[AllocationID] [int] NULL,
	[ShippingQty] [int] NULL,
	[ShippingDate] [datetime] NULL,
	[ShippingCreated] [datetime] NULL,
	[ShippingCreatedBy] [int] NULL,
	[ShippingUpdated] [datetime] NULL,
	[ShippingUpdatedBy] [int] NULL,
 CONSTRAINT [PK_TRK22_Shippin] PRIMARY KEY CLUSTERED 
(
	[ShippingID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TRK22_Template]    Script Date: 6/9/2022 9:10:47 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TRK22_Template](
	[TemplateID] [int] IDENTITY(1,1) NOT NULL,
	[TemplateName] [varchar](50) NULL,
	[TemplateActive] [bit] NULL,
	[TemplateCreated] [datetime] NULL,
	[TemplateCreatedBy] [int] NULL,
	[TemplateUpdated] [datetime] NULL,
	[TemplateUpdatedBy] [int] NULL,
 CONSTRAINT [PK_TRK22_Template] PRIMARY KEY CLUSTERED 
(
	[TemplateID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TRK22_TemplateStep]    Script Date: 6/9/2022 9:10:47 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TRK22_TemplateStep](
	[TemplateStepID] [int] IDENTITY(1,1) NOT NULL,
	[TemplateID] [int] NULL,
	[OperationID] [int] NULL,
	[TemplateStepSeq] [int] NULL,
	[TemplateStepInstructions] [varchar](255) NULL,
	[TemplateStepCreated] [datetime] NULL,
	[TemplateStepCreatedBy] [int] NULL,
	[TemplateStepUpdated] [datetime] NULL,
	[TemplateStepUpdatedBy] [int] NULL,
 CONSTRAINT [PK_TRK22_TemplateStep] PRIMARY KEY CLUSTERED 
(
	[TemplateStepID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TRK22_Traveler]    Script Date: 6/9/2022 9:10:47 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TRK22_Traveler](
	[TravelerID] [int] IDENTITY(1,1) NOT NULL,
	[CddID] [int] NULL,
	[TemplateID] [int] NULL,
	[TravelerLotNum] [int] NULL,
	[TravelerShopOrder] [varchar](25) NULL,
	[TravelerScheduleQty] [int] NULL,
	[TravelerActive] [bit] NULL,
	[TravelerComplete] [bit] NULL,
	[TravelerCreated] [datetime] NULL,
	[TravelerCreatedBy] [int] NULL,
	[TravelerUpdated] [datetime] NULL,
	[TravelerUpdatedBy] [int] NULL,
 CONSTRAINT [PK_TRK22_Traveler] PRIMARY KEY CLUSTERED 
(
	[TravelerID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TRK22_TravelerHours]    Script Date: 6/9/2022 9:10:47 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TRK22_TravelerHours](
	[TravelerHoursID] [int] IDENTITY(1,1) NOT NULL,
	[TravelerStepID] [int] NULL,
	[HoursStationID] [int] NULL,
	[HoursFinishQty] [int] NULL,
	[HoursStartTime] [datetime] NULL,
	[HoursFinishTime] [datetime] NULL,
	[HoursMinutes] [float] NULL,
	[HoursBuildValue] [float] NULL,
	[HoursCreated] [datetime] NULL,
	[HoursCreatedBy] [int] NULL,
	[HoursUpdated] [datetime] NULL,
	[HoursUpdatedBy] [int] NULL,
 CONSTRAINT [PK_TRK22_Hours] PRIMARY KEY CLUSTERED 
(
	[TravelerHoursID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TRK22_TravelerLoss]    Script Date: 6/9/2022 9:10:47 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TRK22_TravelerLoss](
	[TravelerLossID] [int] IDENTITY(1,1) NOT NULL,
	[TravelerID] [int] NULL,
	[TravelerHoursID] [int] NULL,
	[TravelerLossDesc] [varchar](255) NULL,
	[TravelerLossQty] [int] NULL,
	[TravelerLossCreated] [datetime] NULL,
	[TravelerLossCreatedBy] [int] NULL,
	[TravelerLossUpdated] [datetime] NULL,
	[TravelerLossUpdatedBy] [int] NULL,
 CONSTRAINT [PK_TRK22_TravelerLoss] PRIMARY KEY CLUSTERED 
(
	[TravelerLossID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TRK22_TravelerStep]    Script Date: 6/9/2022 9:10:47 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TRK22_TravelerStep](
	[TravelerStepID] [int] IDENTITY(1,1) NOT NULL,
	[TravelerID] [int] NULL,
	[TemplateStepID] [int] NULL,
	[TravelerStepSeq] [int] NULL,
	[TravelerStepInstructions] [varchar](50) NULL,
	[TravelerStepOperationName] [varchar](50) NULL,
	[TravelerStepCreated] [datetime] NULL,
	[TravelerStepCreatedBy] [int] NULL,
	[TravelerStepUpdated] [datetime] NULL,
	[TravelerStepUpdatedBy] [int] NULL,
 CONSTRAINT [PK_TRK22_TravelerStep] PRIMARY KEY CLUSTERED 
(
	[TravelerStepID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TRK22_TravelerStepLoss]    Script Date: 6/9/2022 9:10:47 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TRK22_TravelerStepLoss](
	[TravelerStepLossID] [int] IDENTITY(1,1) NOT NULL,
	[OperationLossID] [int] NULL,
	[TravelerStepLossName] [varchar](50) NULL,
	[TravelerStepLossCreated] [datetime] NULL,
	[TravelerStepLossCreatedBy] [int] NULL,
	[TravelerStepLossUpdated] [datetime] NULL,
	[TravelerStepLossUpdatedBy] [int] NULL,
 CONSTRAINT [PK_TRK22_TravelerStepLos] PRIMARY KEY CLUSTERED 
(
	[TravelerStepLossID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[TRK22_Operation] ON 

INSERT [dbo].[TRK22_Operation] ([OperationID], [OperationName], [OperationActive], [OperationCreated], [OperationCreatedBy], [OperationUpdated], [OperationUpdatedBy]) VALUES (1, N'Bond & Wind', 1, CAST(N'2022-06-09T08:53:58.723' AS DateTime), 998, CAST(N'2022-06-09T08:53:58.723' AS DateTime), 998)
INSERT [dbo].[TRK22_Operation] ([OperationID], [OperationName], [OperationActive], [OperationCreated], [OperationCreatedBy], [OperationUpdated], [OperationUpdatedBy]) VALUES (2, N'Encap', 1, CAST(N'2022-06-09T08:54:17.810' AS DateTime), 998, CAST(N'2022-06-09T08:54:17.810' AS DateTime), 998)
INSERT [dbo].[TRK22_Operation] ([OperationID], [OperationName], [OperationActive], [OperationCreated], [OperationCreatedBy], [OperationUpdated], [OperationUpdatedBy]) VALUES (3, N'Test', 1, CAST(N'2022-06-09T08:55:08.620' AS DateTime), 998, CAST(N'2022-06-09T08:55:08.620' AS DateTime), 998)
INSERT [dbo].[TRK22_Operation] ([OperationID], [OperationName], [OperationActive], [OperationCreated], [OperationCreatedBy], [OperationUpdated], [OperationUpdatedBy]) VALUES (4, N'Inspect In Tape', 1, CAST(N'2022-06-09T08:55:17.527' AS DateTime), 998, CAST(N'2022-06-09T08:55:17.527' AS DateTime), 998)
INSERT [dbo].[TRK22_Operation] ([OperationID], [OperationName], [OperationActive], [OperationCreated], [OperationCreatedBy], [OperationUpdated], [OperationUpdatedBy]) VALUES (5, N'Pack', 1, CAST(N'2022-06-09T08:55:24.723' AS DateTime), 998, CAST(N'2022-06-09T08:55:24.723' AS DateTime), 998)
INSERT [dbo].[TRK22_Operation] ([OperationID], [OperationName], [OperationActive], [OperationCreated], [OperationCreatedBy], [OperationUpdated], [OperationUpdatedBy]) VALUES (6, N'Solder', 1, CAST(N'2022-06-09T08:55:37.293' AS DateTime), 998, CAST(N'2022-06-09T08:55:37.293' AS DateTime), 998)
SET IDENTITY_INSERT [dbo].[TRK22_Operation] OFF
GO
SET IDENTITY_INSERT [dbo].[TRK22_Template] ON 

INSERT [dbo].[TRK22_Template] ([TemplateID], [TemplateName], [TemplateActive], [TemplateCreated], [TemplateCreatedBy], [TemplateUpdated], [TemplateUpdatedBy]) VALUES (1, N'Test', 1, CAST(N'2022-06-01T15:23:37.947' AS DateTime), 998, CAST(N'2022-06-01T15:23:37.947' AS DateTime), 998)
INSERT [dbo].[TRK22_Template] ([TemplateID], [TemplateName], [TemplateActive], [TemplateCreated], [TemplateCreatedBy], [TemplateUpdated], [TemplateUpdatedBy]) VALUES (2, N'test2', 1, CAST(N'2022-06-02T18:13:08.200' AS DateTime), 998, CAST(N'2022-06-02T18:13:08.200' AS DateTime), 998)
SET IDENTITY_INSERT [dbo].[TRK22_Template] OFF
GO
SET IDENTITY_INSERT [dbo].[TRK22_TemplateStep] ON 

INSERT [dbo].[TRK22_TemplateStep] ([TemplateStepID], [TemplateID], [OperationID], [TemplateStepSeq], [TemplateStepInstructions], [TemplateStepCreated], [TemplateStepCreatedBy], [TemplateStepUpdated], [TemplateStepUpdatedBy]) VALUES (17, 2, 6, 6, N'', CAST(N'2022-06-09T14:06:48.690' AS DateTime), 998, CAST(N'2022-06-09T14:06:48.690' AS DateTime), 998)
INSERT [dbo].[TRK22_TemplateStep] ([TemplateStepID], [TemplateID], [OperationID], [TemplateStepSeq], [TemplateStepInstructions], [TemplateStepCreated], [TemplateStepCreatedBy], [TemplateStepUpdated], [TemplateStepUpdatedBy]) VALUES (18, 2, 5, 5, N'', CAST(N'2022-06-09T14:06:50.120' AS DateTime), 998, CAST(N'2022-06-09T14:06:50.120' AS DateTime), 998)
INSERT [dbo].[TRK22_TemplateStep] ([TemplateStepID], [TemplateID], [OperationID], [TemplateStepSeq], [TemplateStepInstructions], [TemplateStepCreated], [TemplateStepCreatedBy], [TemplateStepUpdated], [TemplateStepUpdatedBy]) VALUES (19, 2, 4, 4, N'', CAST(N'2022-06-09T14:06:51.910' AS DateTime), 998, CAST(N'2022-06-09T14:06:51.910' AS DateTime), 998)
INSERT [dbo].[TRK22_TemplateStep] ([TemplateStepID], [TemplateID], [OperationID], [TemplateStepSeq], [TemplateStepInstructions], [TemplateStepCreated], [TemplateStepCreatedBy], [TemplateStepUpdated], [TemplateStepUpdatedBy]) VALUES (20, 2, 3, 3, N'', CAST(N'2022-06-09T14:06:53.610' AS DateTime), 998, CAST(N'2022-06-09T14:06:53.610' AS DateTime), 998)
INSERT [dbo].[TRK22_TemplateStep] ([TemplateStepID], [TemplateID], [OperationID], [TemplateStepSeq], [TemplateStepInstructions], [TemplateStepCreated], [TemplateStepCreatedBy], [TemplateStepUpdated], [TemplateStepUpdatedBy]) VALUES (21, 2, 2, 2, N'', CAST(N'2022-06-09T14:06:54.950' AS DateTime), 998, CAST(N'2022-06-09T14:06:54.950' AS DateTime), 998)
INSERT [dbo].[TRK22_TemplateStep] ([TemplateStepID], [TemplateID], [OperationID], [TemplateStepSeq], [TemplateStepInstructions], [TemplateStepCreated], [TemplateStepCreatedBy], [TemplateStepUpdated], [TemplateStepUpdatedBy]) VALUES (22, 2, 1, 1, N'', CAST(N'2022-06-09T14:06:56.680' AS DateTime), 998, CAST(N'2022-06-09T14:06:56.680' AS DateTime), 998)
SET IDENTITY_INSERT [dbo].[TRK22_TemplateStep] OFF
GO
ALTER TABLE [dbo].[TRK22_Allocation] ADD  CONSTRAINT [DF_TRK22_Allocation_AllocationCreated]  DEFAULT (getdate()) FOR [AllocationCreated]
GO
ALTER TABLE [dbo].[TRK22_Allocation] ADD  CONSTRAINT [DF_TRK22_Allocation_AllocationUpdated]  DEFAULT (getdate()) FOR [AllocationUpdated]
GO
ALTER TABLE [dbo].[TRK22_Cdd] ADD  CONSTRAINT [DF_TRK22_Cdd_CddCreated]  DEFAULT (getdate()) FOR [CddCreated]
GO
ALTER TABLE [dbo].[TRK22_Cdd] ADD  CONSTRAINT [DF_TRK22_Cdd_CddUpdated]  DEFAULT (getdate()) FOR [CddUpdated]
GO
ALTER TABLE [dbo].[TRK22_Inventory] ADD  CONSTRAINT [DF_TRK22_Inventory_InventoryCreated]  DEFAULT (getdate()) FOR [InventoryCreated]
GO
ALTER TABLE [dbo].[TRK22_Inventory] ADD  CONSTRAINT [DF_TRK22_Inventory_InventoryUpdated]  DEFAULT (getdate()) FOR [InventoryUpdated]
GO
ALTER TABLE [dbo].[TRK22_Operation] ADD  CONSTRAINT [DF_TRK22_Operation_OperationCreated]  DEFAULT (getdate()) FOR [OperationCreated]
GO
ALTER TABLE [dbo].[TRK22_Operation] ADD  CONSTRAINT [DF_TRK22_Operation_OperationUpdated]  DEFAULT (getdate()) FOR [OperationUpdated]
GO
ALTER TABLE [dbo].[TRK22_OperationLoss] ADD  CONSTRAINT [DF_TRK22_OperationLoss_OperationLossCreated]  DEFAULT (getdate()) FOR [OperationLossCreated]
GO
ALTER TABLE [dbo].[TRK22_OperationLoss] ADD  CONSTRAINT [DF_TRK22_OperationLoss_OperationLossUpdated]  DEFAULT (getdate()) FOR [OperationLossUpdated]
GO
ALTER TABLE [dbo].[TRK22_Order] ADD  CONSTRAINT [DF_TRK22_Order_OrderCreated]  DEFAULT (getdate()) FOR [OrderCreated]
GO
ALTER TABLE [dbo].[TRK22_Order] ADD  CONSTRAINT [DF_TRK22_Order_OrderUpdated]  DEFAULT (getdate()) FOR [OrderUpdated]
GO
ALTER TABLE [dbo].[TRK22_Shipping] ADD  CONSTRAINT [DF_TRK22_Shippin_ShippingCreated]  DEFAULT (getdate()) FOR [ShippingCreated]
GO
ALTER TABLE [dbo].[TRK22_Shipping] ADD  CONSTRAINT [DF_TRK22_Shippin_ShippingUpdated]  DEFAULT (getdate()) FOR [ShippingUpdated]
GO
ALTER TABLE [dbo].[TRK22_Template] ADD  CONSTRAINT [DF_TRK22_Template_TemplateCreated]  DEFAULT (getdate()) FOR [TemplateCreated]
GO
ALTER TABLE [dbo].[TRK22_Template] ADD  CONSTRAINT [DF_TRK22_Template_TemplateUpdated]  DEFAULT (getdate()) FOR [TemplateUpdated]
GO
ALTER TABLE [dbo].[TRK22_TemplateStep] ADD  CONSTRAINT [DF_TRK22_TemplateStep_TemplateStepCreated]  DEFAULT (getdate()) FOR [TemplateStepCreated]
GO
ALTER TABLE [dbo].[TRK22_TemplateStep] ADD  CONSTRAINT [DF_TRK22_TemplateStep_TemplateStepUpdated]  DEFAULT (getdate()) FOR [TemplateStepUpdated]
GO
ALTER TABLE [dbo].[TRK22_Traveler] ADD  CONSTRAINT [DF_TRK22_Traveler_TravelerCreated]  DEFAULT (getdate()) FOR [TravelerCreated]
GO
ALTER TABLE [dbo].[TRK22_Traveler] ADD  CONSTRAINT [DF_TRK22_Traveler_TravelerUpdated]  DEFAULT (getdate()) FOR [TravelerUpdated]
GO
ALTER TABLE [dbo].[TRK22_TravelerHours] ADD  CONSTRAINT [DF_TRK22_TravelerHours_HoursUpdated]  DEFAULT (getdate()) FOR [HoursUpdated]
GO
ALTER TABLE [dbo].[TRK22_TravelerLoss] ADD  CONSTRAINT [DF_TRK22_TravelerLoss_TravelerLossCreated]  DEFAULT (getdate()) FOR [TravelerLossCreated]
GO
ALTER TABLE [dbo].[TRK22_TravelerLoss] ADD  CONSTRAINT [DF_TRK22_TravelerLoss_TravelerLossUpdated]  DEFAULT (getdate()) FOR [TravelerLossUpdated]
GO
ALTER TABLE [dbo].[TRK22_TravelerStep] ADD  CONSTRAINT [DF_TRK22_TravelerStep_TravelerStepCreated]  DEFAULT (getdate()) FOR [TravelerStepCreated]
GO
ALTER TABLE [dbo].[TRK22_TravelerStep] ADD  CONSTRAINT [DF_TRK22_TravelerStep_TravelerStepUpdated]  DEFAULT (getdate()) FOR [TravelerStepUpdated]
GO
ALTER TABLE [dbo].[TRK22_TravelerStepLoss] ADD  CONSTRAINT [DF_TRK22_TravelerStepLos_TravelerStepLossCreated]  DEFAULT (getdate()) FOR [TravelerStepLossCreated]
GO
ALTER TABLE [dbo].[TRK22_TravelerStepLoss] ADD  CONSTRAINT [DF_TRK22_TravelerStepLos_TravelerStepLossUpdated]  DEFAULT (getdate()) FOR [TravelerStepLossUpdated]
GO
/****** Object:  StoredProcedure [dbo].[TRK22_TemplateDefinitionSave]    Script Date: 6/9/2022 9:10:47 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Chase Kruse
-- Create date: 6/1/2022
-- Description:	TRK22_TemplateDefinitionSave
-- =============================================
CREATE PROCEDURE [dbo].[TRK22_TemplateDefinitionSave]
	-- Add the parameters for the stored procedure here
	@TemplateID as int,
	@TemplateName as varchar(50),
	@TemplateActive as bit,
	@PostDate as datetime,
	@UserID as int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	IF @TemplateID = 0 BEGIN
		INSERT INTO TRK22_Template (
			TemplateName,
			TemplateActive,
			TemplateCreated,
			TemplateCreatedBy,
			TemplateUpdated,
			TemplateUpdatedBy
		)
		VALUES (
			@TemplateName,
			@TemplateActive,
			@PostDate,
			@UserID,
			@PostDate,
			@UserID
		)

		SET @TemplateID = SCOPE_IDENTITY()
	END
	ELSE BEGIN
		UPDATE       
			TRK22_Template
		SET                
			TemplateName = @TemplateName, 
			TemplateActive = @TemplateActive,
			TemplateCreated = @PostDate, 
			TemplateCreatedBy = @UserID, 
			TemplateUpdated = @PostDate, 
			TemplateUpdatedBy = @UserID
		WHERE
			TemplateID = @TemplateID
	END

	SELECT @TemplateID as TemplateID
END
GO
/****** Object:  StoredProcedure [dbo].[TRK22_TemplateDefinitionSelect]    Script Date: 6/9/2022 9:10:47 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Chase Kruse
-- Create date: 6/1/2022
-- Description:	TRK22_TemplateDefinitionSelect
-- =============================================
CREATE PROCEDURE [dbo].[TRK22_TemplateDefinitionSelect]
	-- Add the parameters for the stored procedure here
	@TemplateID as int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT
		TemplateID,
		TemplateName,
		case when TemplateActive = 1 then 'True' else 'False' end as TemplateActive,
		TemplateCreated,
		CU.Username as TemplateCreatedBy,
		TemplateUpdated,
		UU.Username as TemplateUpdatedBy
	FROM
		TRK22_Template M left outer join
		BOS2.dbo.tblSysUser CU on M.TemplateCreatedBy = CU.UserID left outer join
		BOS2.dbo.tblSysUser UU on M.TemplateUpdatedBy = UU.UserID
	WHERE
		TemplateID = @TemplateID
END
GO
/****** Object:  StoredProcedure [dbo].[TRK22_TemplateStepDefinitionDelete]    Script Date: 6/9/2022 9:10:47 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Chase Kruse
-- Create date: 6/3/2022
-- Description:	TRK22_TemplateStepDefinitionDelete
-- =============================================
CREATE PROCEDURE [dbo].[TRK22_TemplateStepDefinitionDelete]
	@TemplateStepID as int
AS
BEGIN
	SET NOCOUNT ON;
	

	DECLARE @TemplateID as int = 0
	DECLARE @Seq as int = 0

	-- Grab the Tempalte ID before we delete
	SELECT @TemplateID = TemplateID
	FROM TRK22_TemplateStep
	WHERE TemplateStepID = @TemplateStepID

	-- Delete the record
	DELETE TRK22_TemplateStep
	WHERE TemplateStepID = @TemplateStepID

	-- Update the seq for all records
	UPDATE 
		TRK22_TemplateStep
	SET 
		TemplateStepSeq = NewSeq
	FROM (
		SELECT 
			TemplateStepID, 
			TemplateStepSeq,
			ROW_NUMBER() OVER (ORDER BY TemplateStepSeq) AS NewSeq
		FROM 
			TRK22_TemplateStep
	) TRK22_TemplateStep

END
GO
/****** Object:  StoredProcedure [dbo].[TRK22_TemplateStepDefinitionSave]    Script Date: 6/9/2022 9:10:47 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Chase Kruse
-- Create date: 6/3/2022
-- Description:	TRK22_TemplateStepDefinitionSave
-- =============================================
CREATE PROCEDURE [dbo].[TRK22_TemplateStepDefinitionSave]
	@TemplateStepID as int,
	@TemplateID as int,
	@TemplateStepOperationID as int,
	@TemplateStepSeq as int,
	@TemplateStepInstructions as varchar(255),
	@PostDate as datetime,
	@UserID as int
AS
BEGIN
	SET NOCOUNT ON;

	IF @TemplateStepID = 0 BEGIN
	
		INSERT INTO TRK22_TemplateStep (
			TemplateID,
			OperationID,
			TemplateStepSeq,
			TemplateStepInstructions,
			TemplateStepCreated,
			TemplateStepCreatedBy,
			TemplateStepUpdated,
			TemplateStepUpdatedBy
		)
		VALUES (
			@TemplateID,
			@TemplateStepOperationID,
			@TemplateStepSeq,
			@TemplateStepInstructions,
			@PostDate,
			@UserID,
			@PostDate,
			@UserID
		)

		-- Update the seq for all records
		UPDATE 
			TRK22_TemplateStep
		SET 
			TemplateStepSeq = NewSeq
		FROM (
			SELECT 
				TemplateStepID, 
				TemplateStepSeq,
				ROW_NUMBER() OVER (ORDER BY TemplateStepSeq, TemplateStepCreated DESC) AS NewSeq
			FROM 
				TRK22_TemplateStep
		) TRK22_TemplateStep

		SET @TemplateStepID = SCOPE_IDENTITY()
	END
	--ELSE BEGIN	
		-- Update the seq for all records
		--UPDATE 
		--	TRK22_TemplateStep
		--SET 
		--	TemplateStepSeq = NewSeq
		--FROM (
		--	SELECT 
		--		TemplateStepID, 
		--		TemplateStepSeq,
		--		ROW_NUMBER() OVER (ORDER BY TemplateStepSeq) AS NewSeq
		--	FROM 
		--		TRK22_TemplateStep
		--) TRK22_TemplateStep

	--	UPDATE	
	--		TRK22_TemplateStep
	--	SET       
	--		TemplateID = @TemplateID, 
	--		OperationID = @TemplateStepOperationID, 
	--		TemplateStepSeq = @TemplateStepSeq, 
	--		TemplateStepInstructions = @TemplateStepInstructions, 
	--		TemplateStepCreated = @PostDate, 
	--		TemplateStepCreatedBy = @UserID, 
	--		TemplateStepUpdated = @PostDate, 
 --           TemplateStepUpdatedBy = @UserID
	--	WHERE
	--		TemplateStepID = @TemplateStepID
	--END

	SELECT @TemplateStepID as TemplateStepID

END
GO
/****** Object:  StoredProcedure [dbo].[TRK22_TemplateStepSummarySelect]    Script Date: 6/9/2022 9:10:47 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Chase Kruse
-- Create date: 6/1/2022
-- Description:	TRK22_TemplateStepSummarySelect
-- =============================================
CREATE PROCEDURE [dbo].[TRK22_TemplateStepSummarySelect]
	-- Add the parameters for the stored procedure here
	@TemplateID as int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Retrieve Operation List
	SELECT 
		OperationID,
		OperationName
	FROM 
		TRK22_Operation
	WHERE
		OperationActive = 1

	SELECT 
		TemplateStepID,
		TemplateStepSeq,
		OperationName,
		TemplateStepInstructions,
		convert(varchar(10), TemplateStepUpdated, 101) as TemplateStepUpdated,
		UU.Username as TemplateStepUpdatedBy,
		ROW_NUMBER() OVER (ORDER BY TemplateStepSeq ASC) as RN
	FROM
		TRK22_TemplateStep MS left outer join
		TRK22_Operation O on MS.OperationID = O.OperationID left outer join
		BOS2.dbo.tblSysUser UU on MS.TemplateStepUpdatedBy = UU.UserID
END
GO
/****** Object:  StoredProcedure [dbo].[TRK22_TemplateSummarySelect]    Script Date: 6/9/2022 9:10:47 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Chase Kruse
-- Create date: 6/1/2022
-- Description:	TRK22_TemplateSummarySelect
-- =============================================
CREATE PROCEDURE [dbo].[TRK22_TemplateSummarySelect]
	-- Add the parameters for the stored procedure here
	@Search as varchar(50),
	@Start as int,
	@Finish as int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT 
		COUNT(*) as CoreTotal
	FROM 
		TRK22_Template
	WHERE 
		TemplateName like '%' + @Search + '%'

	SELECT 
		*
	FROM (
		SELECT 
			TemplateID,
			TemplateName,
			TemplateActive,
			convert(varchar(10), TemplateUpdated, 100) as TemplateUpdated,
			UU.Username as TemplateUpdatedBy,
			ROW_NUMBER() OVER (ORDER BY TemplateActive, TemplateID DESC) as RN
		FROM
			TRK22_Template M left outer join
			BOS2.dbo.tblSysUser UU on M.TemplateUpdatedBy = UU.UserID
		WHERE
			TemplateName like '%' + @Search + '%'
	) DT
	WHERE
		RN between @Start and @Finish
END
GO
/****** Object:  StoredProcedure [dbo].[TRK22_TravelerDefinitionDelete]    Script Date: 6/9/2022 9:10:47 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Chase Kruse
-- Create date: 2/14/2022
-- Description:	TRK22_TravelerDefinitionDelete
-- =============================================
CREATE PROCEDURE [dbo].[TRK22_TravelerDefinitionDelete]
	@TravelerID as int
AS
BEGIN
	SET NOCOUNT ON;

	UPDATE
		TRK22_Traveler
	SET
		TravelerActive = 0
	WHERE
		TravelerID = @TravelerID

END
GO
/****** Object:  StoredProcedure [dbo].[TRK22_TravelerDefinitionSave]    Script Date: 6/9/2022 9:10:47 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Chase Kruse
-- Create date: 2/14/2022
-- Description:	TRK22_TravelerDefinitionSave
-- =============================================
CREATE PROCEDURE [dbo].[TRK22_TravelerDefinitionSave]
	@TravelerID as int,
	@TravelerLotNum as int,
	@TravelerCddID as int,
	@TravelerTemplateID as int,
	@TravelerShopOrder as varchar(50),
	@TravelerScheduleQty as int,
	@TravelerComplete as bit,
	@PostDate as datetime,
	@UserID as int
AS
BEGIN
	SET NOCOUNT ON;

	IF @TravelerID = 0 BEGIN
		INSERT INTO TRK22_Traveler (
			CddID,
			TemplateID,
			TravelerLotNum,
			TravelerShopOrder,
			TravelerScheduleQty,
			TravelerComplete,
			TravelerActive,
			TravelerCreated,
			TravelerCreatedBy,
			TravelerUpdated,
			TravelerUpdatedBy
		)
		VALUES (
			@TravelerCddID,
			@TravelerTemplateID,
			@TravelerLotNum,
			@TravelerShopOrder,
			@TravelerScheduleQty,
			0,
			1,
			@PostDate,
			@UserID,
			@PostDate,
			@UserID
		)
		
		SET @TravelerID = SCOPE_IDENTITY()

		INSERT INTO TRK22_TravelerStep (
			TravelerID,
			TemplateStepID,
			TravelerStepSeq,
			TravelerStepCreated,
			TravelerStepCreatedBy,
			TravelerStepUpdated,
			TravelerStepUpdatedBy
		)
		SELECT
			@TravelerID,
			TemplateStepID,
			TemplateStepSeq,
			@PostDate,
			@UserID,
			@PostDate,
			@UserID
		FROM
			TRK22_TemplateStep MS
		WHERE
			TemplateID = @TravelerTemplateID
		

	END
	ELSE BEGIN
		UPDATE 
			TRK22_Traveler
		SET 
			TravelerLotNum = @TravelerLotNum, 
			TravelerShopOrder = @TravelerShopOrder, 
			TravelerScheduleQty = @TravelerScheduleQty, 
			TravelerComplete = @TravelerComplete,
			TravelerActive = 1, 
			TravelerCreated = @PostDate, 
			TravelerCreatedBy = @UserID, 
			TravelerUpdated = @PostDate, 
			TravelerUpdatedBy = @UserID
		WHERE
			TravelerID = @TravelerID
	END

	SELECT @TravelerID as TravelerID

END
GO
/****** Object:  StoredProcedure [dbo].[TRK22_TravelerDefinitionSelect]    Script Date: 6/9/2022 9:10:47 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Chase Kruse
-- Create date: 2/14/2022
-- Description:	TRK22_TravelerDefinitionSelect
-- =============================================
CREATE PROCEDURE [dbo].[TRK22_TravelerDefinitionSelect]
	@TravelerID as int
AS
BEGIN
	SET NOCOUNT ON;

	SELECT
		TravelerID,
		TravelerLotNum as TravelerLotNum,
		T.CddID as TravelerCddID,
		CddItem as TravelerCddItem,
		T.TemplateID as TravelerTemplateID,
		TemplateName as TravelerTemplateName,
		TravelerComplete,
		TravelerShopOrder as TravelerShopOrder,
		TravelerScheduleQty as TravelerScheduleQty,
		convert(varchar, TravelerCreated, 100) as TravelerCreated,
		CU.Username as TravelerCreatedBy,
		convert(varchar, TravelerUpdated, 100) as TravelerUpdated,
		UU.Username as TravelerUpdatedBy
	FROM
		TRK22_Traveler T left outer join
		TRK22_Cdd C on T.CddID = C.CddID left outer join
		TRK22_Template M on T.TemplateID = M.TemplateID left outer join
		BOS2.dbo.tblSysUser CU on T.TravelerCreatedBy = CU.UserID left outer join
		BOS2.dbo.tblSysUser UU on T.TravelerUpdatedBy = UU.UserID
	WHERE
		TravelerID = @TravelerID

END
GO
/****** Object:  StoredProcedure [dbo].[TRK22_TravelerSummarySelect]    Script Date: 6/9/2022 9:10:47 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Chase Kruse
-- Create date: 2/14/2022
-- Description:	TRK22_TravelerSummarySelect
-- =============================================
CREATE PROCEDURE [dbo].[TRK22_TravelerSummarySelect]
	@Search as varchar(50),
	@Start as int,
	@Finish as int
AS
BEGIN
	SET NOCOUNT ON;

	SELECT
        COUNT(*) as CoreTotal
    FROM
        TRK22_Traveler
    WHERE
        TravelerActive = 1 AND
        TravelerLotNum like '%' + @Search + '%'

    SELECT
        *
    FROM (
        SELECT
            TravelerID,
            TravelerLotNum,
            T.CddID,
            CddItem,
            T.TemplateID,
            TemplateName,
            TravelerShopOrder,
            TravelerScheduleQty,
            convert(varchar(10), TravelerCreated, 101) as TravelerCreated,
            CU.Username as TravelerCreatedBy,
            ROW_NUMBER() OVER (ORDER BY TravelerID DESC) RN
        FROM
            TRK22_Traveler T left outer join
            TRK22_Cdd C on T.CddID = C.CddID left outer join
            TRK22_Template M on T.TemplateID = M.TemplateID left outer join 
            BOS2.dbo.tblSysUser CU on CU.UserID = T.TravelerCreatedBy
        WHERE
            TravelerActive = 1 AND
            TravelerLotNum like '%' + @Search + '%'

    ) DT
    WHERE
        RN between @Start and @Finish

END
GO
