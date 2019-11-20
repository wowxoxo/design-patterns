// https://iq.opengenus.org/builder-pattern-cpp/
class HousePlan
{
    public void setBasement(String basement);

    public void setStructure(String structure);

    public void setRoof(String roof);

    public void setInterior(String interior);
}

class House : public HousePlan
{
    private String basement;
    private String structure;
    private String roof;
    private String interior;
}