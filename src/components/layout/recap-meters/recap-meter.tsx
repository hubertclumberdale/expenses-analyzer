import { Card } from "react-bootstrap";
import { Variant } from "react-bootstrap/esm/types";

interface RecapMeterProps {
  title: string;
  description: string | number;
  variant: Variant;
}
const RecapMeter = ({ title, description, variant }: RecapMeterProps) => {
  return (
    <>
      <div className="col-xl-3 col-md-6 mb-4">
        <Card className={`border-left-${variant} shadow h-100 py-2`}>
          <Card.Body>
            <div className="row no-gutters align-items-center">
              <div className="col mr-2">
                <div
                  className={`text-xs font-weight-bold text-${variant} text-uppercase mb-1`}
                >
                  {title}
                </div>
                <div className="h5 mb-0 font-weight-bold text-gray-800">
                  {description}
                </div>
              </div>
              <div className="col-auto">
                <i className="fas fa-calendar fa-2x text-gray-300"></i>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default RecapMeter;
