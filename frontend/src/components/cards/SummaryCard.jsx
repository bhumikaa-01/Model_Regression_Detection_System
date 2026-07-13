import {
    Card,
    CardContent,
    Typography,
    Box,
} from "@mui/material";

export default function SummaryCard({
    title,
    value,
    subtitle,
    color,
}) {
    return (
        <Card
            elevation={0}
            sx={{
                borderRadius:4,
                border:"1px solid #ECECEC",
                height:"100%"
            }}
        >
            <CardContent>

                <Typography
                    color="text.secondary"
                    fontSize={15}
                >
                    {title}
                </Typography>

                <Typography
                    variant="h3"
                    fontWeight={700}
                    mt={2}
                    color={color}
                >
                    {value}
                </Typography>

                <Typography
                    mt={1}
                    color="text.secondary"
                >
                    {subtitle}
                </Typography>

            </CardContent>
        </Card>
    );
}