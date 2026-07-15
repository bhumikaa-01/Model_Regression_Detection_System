import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

import MainLayout from "../../components/layout/MainLayout";
import { getAllReports } from "../../services/api";

import ReportsTable from "../../components/tables/ReportTable";

export default function Reports() {

    const [reports, setReports] = useState([]);

    useEffect(() => {

        async function loadReports() {

            try {

                const data = await getAllReports();

                

                setReports(data);

            } catch (error) {

                console.error(error);

            }

        }

        loadReports();

    }, []);

    return (

        <MainLayout>

            <Box>

                <Typography
                    variant="h4"
                    fontWeight={700}
                    mb={2}
                >
                    Evaluation Reports
                </Typography>

               <ReportsTable reports={reports} />

            </Box>

        </MainLayout>

    );

}